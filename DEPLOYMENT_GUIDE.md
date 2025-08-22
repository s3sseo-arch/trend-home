# Deployment Guide - Window Configurator System

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Domain name and hosting service
- SSL certificate
- Email service (SMTP) credentials

### Build Process

#### 1. Environment Setup
Create production environment file:
```bash
# .env.production
VITE_API_URL=https://your-domain.com/api
VITE_ADMIN_EMAIL=admin@trendhome-fenster.de
VITE_COMPANY_NAME=TrendHome Fenster
VITE_COMPANY_PHONE=+49 (0) 179 74 25361
VITE_SMTP_HOST=smtp.your-provider.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@domain.com
VITE_SMTP_PASS=your-password
```

#### 2. Production Build
```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Create production build
npm run build

# Test production build locally
npm run preview
```

#### 3. Build Optimization
```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/assets/*.js

# Optimize images (if any)
npm install -g imagemin-cli
imagemin src/assets/images/* --out-dir=dist/assets/images
```

## 🌐 Hosting Options

### Option 1: Netlify Deployment

#### Automatic Deployment
1. **Connect Repository**
   ```bash
   # Push code to GitHub/GitLab
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Netlify Configuration**
   - Site settings → Build & deploy
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `16`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-site.netlify.app/api
   VITE_ADMIN_EMAIL=admin@trendhome-fenster.de
   VITE_COMPANY_NAME=TrendHome Fenster
   ```

4. **Custom Domain Setup**
   ```
   # Add custom domain in Netlify dashboard
   Domain: trendhome-configurator.com
   
   # DNS Configuration
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

#### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=dist
```

### Option 2: Vercel Deployment

#### Automatic Deployment
1. **Connect Repository**
   - Import project from GitHub
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-project.vercel.app/api
   VITE_ADMIN_EMAIL=admin@trendhome-fenster.de
   ```

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### Option 3: Traditional Web Hosting

#### Shared Hosting Setup
```bash
# Build the project
npm run build

# Upload dist folder contents to public_html
# Via FTP, cPanel File Manager, or hosting control panel
```

#### Apache Configuration (.htaccess)
```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle client-side routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name trendhome-configurator.com www.trendhome-configurator.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name trendhome-configurator.com www.trendhome-configurator.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/html/dist;
    index index.html;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

## 📧 Email Service Setup

### Option 1: SMTP Configuration
```typescript
// Email service configuration
const emailConfig = {
  host: process.env.VITE_SMTP_HOST,
  port: parseInt(process.env.VITE_SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.VITE_SMTP_PASS,
  },
};
```

### Option 2: SendGrid Integration
```bash
# Install SendGrid
npm install @sendgrid/mail

# Environment variable
VITE_SENDGRID_API_KEY=your-sendgrid-api-key
```

```typescript
// SendGrid implementation
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.VITE_SENDGRID_API_KEY);

const sendEmail = async (emailData) => {
  const msg = {
    to: emailData.to,
    from: 'noreply@trendhome-fenster.de',
    subject: emailData.subject,
    html: emailData.body,
    attachments: emailData.attachment ? [{
      content: emailData.attachment,
      filename: 'window-configuration.pdf',
      type: 'application/pdf',
    }] : [],
  };
  
  return await sgMail.send(msg);
};
```

### Option 3: EmailJS (Client-side)
```bash
# Install EmailJS
npm install @emailjs/browser
```

```typescript
// EmailJS configuration
import emailjs from '@emailjs/browser';

emailjs.init(process.env.VITE_EMAILJS_PUBLIC_KEY);

const sendEmail = async (templateParams) => {
  return await emailjs.send(
    process.env.VITE_EMAILJS_SERVICE_ID,
    process.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams
  );
};
```

## 🗄️ Database Setup (Optional)

### Option 1: Supabase Integration
```bash
# Install Supabase client
npm install @supabase/supabase-js
```

```sql
-- Database schema
CREATE TABLE manufacturers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  materials TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20),
  customer_address TEXT,
  configuration JSONB NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Option 2: Firebase Integration
```bash
# Install Firebase
npm install firebase
```

```typescript
// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## 🔒 Security Configuration

### SSL Certificate Setup
```bash
# Let's Encrypt (Free SSL)
sudo apt install certbot
sudo certbot --nginx -d trendhome-configurator.com
```

### Security Headers
```typescript
// Security middleware (if using Express.js backend)
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});
```

### Environment Security
```bash
# Secure environment variables
chmod 600 .env.production

# Use secrets management for sensitive data
# AWS Secrets Manager, Azure Key Vault, etc.
```

## 📊 Monitoring & Analytics

### Google Analytics Setup
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring (Sentry)
```bash
# Install Sentry
npm install @sentry/react @sentry/tracing
```

```typescript
// Sentry configuration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Performance Monitoring
```typescript
// Performance tracking
const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
    });
  }
};
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build project
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.API_URL }}
        VITE_ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🧪 Testing in Production

### Health Check Endpoint
```typescript
// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

### Smoke Tests
```bash
# Test critical functionality
curl -f https://trendhome-configurator.com/health
curl -f https://trendhome-configurator.com/
curl -f https://trendhome-configurator.com/shop
curl -f https://trendhome-configurator.com/window-configurator
```

## 📈 Performance Optimization

### CDN Setup
```html
<!-- Use CDN for static assets -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Caching Strategy
```typescript
// Service worker for caching
const CACHE_NAME = 'window-configurator-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## 🔧 Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backup Strategy
```bash
# Database backup (if using database)
pg_dump -h localhost -U username dbname > backup.sql

# Configuration backup
cp -r src/config/ backups/config-$(date +%Y%m%d)/
```

### Log Management
```bash
# Log rotation setup
sudo nano /etc/logrotate.d/window-configurator

# Content:
/var/log/window-configurator/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

This deployment guide provides comprehensive instructions for deploying the Window Configurator System to production environments.