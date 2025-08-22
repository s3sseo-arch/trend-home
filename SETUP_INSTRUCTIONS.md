# Complete Setup Instructions for Window Configurator System

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone and Setup Project

```bash
# Navigate to project directory
cd window-configurator

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create new cluster
4. Get connection string
5. Replace in server/.env file

### 3. Environment Configuration

#### Backend Environment (server/.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/window-configurator
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/window-configurator

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_EMAIL=admin@trendhome-fenster.de
VITE_COMPANY_NAME=TrendHome Fenster
VITE_COMPANY_PHONE=+49 (0) 179 74 25361
```

### 4. Email Setup (Gmail Example)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in SMTP_PASS

### 5. Start the Application

#### Option A: Start Both Services Together
```bash
npm run dev:full
```

#### Option B: Start Services Separately
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin

### 7. Default Admin Credentials

- **Username**: admin
- **Password**: admin123
- **Email**: admin@trendhome-fenster.de

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod
```

#### 2. Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in server/.env
PORT=5001
```

#### 3. Email Not Sending
- Verify Gmail App Password is correct
- Check SMTP settings in server/.env
- Ensure 2-Factor Authentication is enabled

#### 4. API Connection Issues
- Verify backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Check browser console for CORS errors

### 5. Build for Production

```bash
# Build frontend
npm run build

# Start production server
cd server
npm start
```

## 📁 Project Structure

```
window-configurator/
├── src/                     # Frontend React app
│   ├── components/          # React components
│   ├── services/           # API services
│   └── utils/              # Utility functions
├── server/                 # Backend Node.js app
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Backend environment
├── package.json           # Frontend dependencies
└── .env                   # Frontend environment
```

## 🎯 Key Features

### For Users:
- Window configuration with real-time preview
- User registration and authentication
- Order submission with email confirmation
- PDF generation with specifications

### For Admins:
- Secure admin login
- Dynamic configuration management
- Order management dashboard
- Real-time order notifications
- Email integration

## 📞 Support

If you encounter any issues:

1. Check this setup guide
2. Verify all environment variables
3. Check console logs for errors
4. Ensure all services are running
5. Verify database connection

## 🔒 Security Notes

- Change default admin password in production
- Use strong JWT secret
- Enable HTTPS in production
- Secure MongoDB with authentication
- Use environment variables for sensitive data

This setup guide provides everything needed to run the complete window configurator system with backend integration.