# Complete Window Configurator System Documentation

## 🏗️ System Overview

This is a comprehensive window configurator system with full backend integration, database management, admin authentication, and order processing capabilities.

### **Technology Stack**
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **PDF Generation**: jsPDF
- **Styling**: Tailwind CSS

---

## 📁 Project Structure

```
window-configurator/
├── src/                          # Frontend React application
│   ├── components/               # React components
│   │   ├── AdminDashboard.tsx   # Admin dashboard with order management
│   │   ├── AdminLogin.tsx       # Admin authentication
│   │   ├── AdminPanel.tsx       # Configuration management
│   │   ├── AuthModal.tsx        # User authentication modal
│   │   ├── Footer.tsx           # Site footer
│   │   ├── Homepage.tsx         # Landing page
│   │   ├── Navbar.tsx           # Navigation header
│   │   ├── PricingPanel.tsx     # Price calculation display
│   │   ├── ShopPage.tsx         # Product catalog
│   │   ├── WindowConfigurator.tsx    # Main configurator
│   │   └── WindowVisualization.tsx   # SVG window preview
│   ├── services/                # API services
│   │   └── api.js               # API service layer
│   ├── utils/                   # Utility functions
│   │   ├── emailService.ts      # Email handling (legacy)
│   │   └── pdfGenerator.ts      # PDF creation
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── server/                      # Backend Node.js application
│   ├── server.js                # Main server file
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
├── package.json                 # Frontend dependencies
└── README.md                    # Project documentation
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### **Backend Setup**

1. **Navigate to server directory**
```bash
cd server
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/window-configurator

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas cloud service
```

6. **Start backend server**
```bash
npm run dev
```

### **Frontend Setup**

1. **Navigate to project root**
```bash
cd ..
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Create frontend environment file**
```bash
# Create .env in root directory
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start frontend development server**
```bash
npm run dev
```

---

## 🔐 Authentication System

### **Admin Authentication**
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`
  - Email: `admin@trendhome-fenster.de`

### **User Authentication**
- Users can register with email, name, phone, and address
- Login with email and password
- JWT token-based authentication
- Automatic session management

---

## 🗄️ Database Schema

### **Admin Collection**
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (default: 'admin'),
  createdAt: Date
}
```

### **User Collection**
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  address: String,
  password: String (hashed),
  createdAt: Date
}
```

### **Configuration Collection**
```javascript
{
  manufacturers: [{
    id: String,
    name: String,
    materials: [String],
    basePrice: Number,
    description: String
  }],
  materials: [{ id, name, price, color, description }],
  windowTypes: [{ id, name, price, description, minHeight, maxHeight }],
  glassTypes: [{ id, name, price, description }],
  colors: [{ id, name, color, price, category }],
  openingTypes: [{ id, name, price, description }],
  rollerShutterTypes: [{ id, name, price, description }],
  lockingOptions: [{ id, name, price, description }],
  updatedAt: Date
}
```

### **Order Collection**
```javascript
{
  orderNumber: String (unique),
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  configuration: {
    manufacturer: String,
    material: String,
    windowType: String,
    dimensions: { width: Number, height: Number },
    glassType: String,
    interiorColor: String,
    exteriorColor: String,
    rollerShutter: Boolean,
    // ... other configuration options
  },
  pricing: {
    basePrice: Number,
    additionalCosts: Number,
    totalPrice: Number,
    breakdown: [{ item: String, price: Number }]
  },
  status: String (enum: ['pending', 'processing', 'completed', 'cancelled']),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 API Endpoints

### **Authentication Endpoints**

#### Admin Login
```
POST /api/admin/login
Body: { username, password }
Response: { success, token, admin }
```

#### User Registration
```
POST /api/auth/register
Body: { name, email, phone, address, password }
Response: { success, token, user }
```

#### User Login
```
POST /api/auth/login
Body: { email, password }
Response: { success, token, user }
```

### **Configuration Endpoints**

#### Get Configuration
```
GET /api/configuration
Response: Configuration object
```

#### Update Configuration (Admin only)
```
PUT /api/configuration
Headers: Authorization: Bearer <token>
Body: Configuration object
Response: Updated configuration
```

### **Order Endpoints**

#### Submit Order
```
POST /api/orders
Body: { customerInfo, configuration, pricing }
Response: { success, orderNumber, message }
```

#### Get Orders (Admin only)
```
GET /api/orders?page=1&limit=10&status=pending
Headers: Authorization: Bearer <token>
Response: { orders, totalPages, currentPage, total }
```

#### Get Single Order (Admin only)
```
GET /api/orders/:id
Headers: Authorization: Bearer <token>
Response: Order object
```

#### Update Order (Admin only)
```
PUT /api/orders/:id
Headers: Authorization: Bearer <token>
Body: { status, notes, ... }
Response: Updated order
```

#### Delete Order (Admin only)
```
DELETE /api/orders/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

### **Dashboard Endpoints**

#### Get Admin Stats
```
GET /api/admin/stats
Headers: Authorization: Bearer <token>
Response: { totalOrders, pendingOrders, processingOrders, completedOrders, recentOrders }
```

---

## 🎨 Frontend Components

### **WindowConfigurator.tsx**
- **Purpose**: Main configurator interface with step-by-step customization
- **Features**: 
  - 7-step configuration wizard
  - Real-time state management
  - Authentication integration
  - Order submission handling
  - Dynamic configuration loading from API

### **AdminDashboard.tsx**
- **Purpose**: Complete admin interface for order and configuration management
- **Features**:
  - Order statistics dashboard
  - Order management (view, update status, delete)
  - Configuration management integration
  - Real-time order updates

### **AdminLogin.tsx**
- **Purpose**: Admin authentication interface
- **Features**:
  - Secure login form
  - JWT token management
  - Error handling
  - Default credentials display

### **AuthModal.tsx**
- **Purpose**: User authentication (login/registration)
- **Features**:
  - Toggle between login and registration
  - Form validation
  - API integration
  - User data collection

### **AdminPanel.tsx**
- **Purpose**: Dynamic configuration management
- **Features**:
  - CRUD operations for all configuration items
  - Real-time updates to configurator
  - Visual form builders
  - Price management

---

## 📧 Email System

### **Automatic Email Notifications**
When an order is submitted:

1. **Admin Email**: 
   - Subject: "New Window Order Request - [Customer Name]"
   - Contains complete order details and customer information
   - Sent to: admin@trendhome-fenster.de

2. **Customer Email**:
   - Subject: "Order Confirmation - TrendHome Fenster"
   - Contains order summary and next steps
   - Sent to: customer's email address

### **Email Configuration**
Configure SMTP settings in server/.env:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 🔒 Security Features

### **Authentication & Authorization**
- JWT token-based authentication
- Password hashing with bcryptjs
- Admin-only routes protection
- Token expiration (24 hours)

### **Data Validation**
- Input validation on both frontend and backend
- MongoDB schema validation
- XSS protection through proper data handling

### **Environment Security**
- Sensitive data in environment variables
- CORS configuration
- Secure password storage

---

## 📊 Admin Dashboard Features

### **Order Management**
- View all orders with pagination
- Filter orders by status
- Update order status (pending → processing → completed)
- View detailed order information
- Delete orders
- Real-time statistics

### **Configuration Management**
- Add/edit/delete manufacturers
- Manage materials and pricing
- Configure window types
- Set up glass types and colors
- Manage opening mechanisms
- Configure roller shutters and locking options

### **Dashboard Statistics**
- Total orders count
- Orders by status (pending, processing, completed)
- Recent orders overview
- Quick access to order management

---

## 🚀 Deployment Guide

### **Backend Deployment**

1. **Environment Setup**
```bash
# Production environment variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/window-configurator
JWT_SECRET=your-production-secret-key
SMTP_HOST=your-smtp-host
SMTP_USER=your-production-email
SMTP_PASS=your-production-password
PORT=5000
```

2. **Build and Deploy**
```bash
# Install dependencies
npm install --production

# Start server
npm start
```

### **Frontend Deployment**

1. **Build for Production**
```bash
# Set production API URL
REACT_APP_API_URL=https://your-api-domain.com/api

# Build
npm run build
```

2. **Deploy to Hosting Service**
- Upload `dist` folder to your hosting service
- Configure environment variables
- Set up domain and SSL

---

## 🔧 Development Guidelines

### **Adding New Configuration Options**

1. **Update Database Schema** (server/server.js)
```javascript
// Add to ConfigurationSchema
newOptions: [{
  id: String,
  name: String,
  price: Number,
  description: String
}]
```

2. **Update Default Configuration**
```javascript
// Add to defaultConfig in initializeDefaults()
newOptions: [
  { id: 'option1', name: 'Option 1', price: 10, description: 'Description' }
]
```

3. **Update Admin Panel** (src/components/AdminPanel.tsx)
```javascript
// Add new tab
{ id: 'newOptions', name: 'New Options', icon: Settings }

// Add form fields in renderFormFields()
case 'newOptions':
  return commonFields; // or custom fields
```

4. **Update Configurator** (src/components/WindowConfigurator.tsx)
```javascript
// Add to configuration state
newOption: string;

// Add step in renderStepContent()
// Add to pricing calculation
```

### **Adding New Order Fields**

1. **Update Order Schema**
2. **Update Frontend Forms**
3. **Update Email Templates**
4. **Update Admin Dashboard**

---

## 🐛 Troubleshooting

### **Common Issues**

#### Database Connection Error
```bash
# Check MongoDB is running
mongod --version

# Check connection string
MONGODB_URI=mongodb://localhost:27017/window-configurator
```

#### Email Not Sending
```bash
# Check SMTP configuration
# For Gmail, use App Password instead of regular password
# Enable 2-factor authentication and generate App Password
```

#### Authentication Issues
```bash
# Check JWT secret is set
JWT_SECRET=your-secret-key

# Clear browser localStorage if tokens are corrupted
localStorage.clear()
```

#### API Connection Issues
```bash
# Check backend server is running on correct port
# Check CORS configuration
# Verify API URL in frontend environment
```

---

## 📈 Future Enhancements

### **Planned Features**
- File upload for custom designs
- Advanced reporting and analytics
- Multi-language support
- Payment integration
- Mobile app version
- Advanced user roles and permissions
- Inventory management
- Customer portal
- Advanced email templates
- SMS notifications

### **Performance Optimizations**
- Database indexing
- API response caching
- Image optimization
- Code splitting
- Service worker implementation

---

## 📞 Support & Maintenance

### **Regular Maintenance Tasks**
- Database backups
- Security updates
- Performance monitoring
- Log analysis
- User feedback review

### **Monitoring**
- Server uptime monitoring
- Database performance
- Email delivery rates
- User authentication success rates
- Order completion rates

---

## 📝 API Testing

### **Using Postman or curl**

#### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### Test Configuration Retrieval
```bash
curl -X GET http://localhost:5000/api/configuration
```

#### Test Order Submission
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerInfo": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+49123456789",
      "address": "Test Address"
    },
    "configuration": {
      "manufacturer": "salamander82",
      "material": "pvc",
      "windowType": "single-sash",
      "dimensions": {"width": 1000, "height": 1200}
    },
    "pricing": {
      "totalPrice": 500
    }
  }'
```

---

This documentation provides a complete guide for developers to understand, maintain, and extend the Window Configurator System. The system is production-ready with full backend integration, database management, and comprehensive admin functionality.