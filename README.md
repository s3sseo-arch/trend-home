# Window Configurator System - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Installation & Setup](#installation--setup)
4. [Component Documentation](#component-documentation)
5. [Features & Functionality](#features--functionality)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Deployment Guide](#deployment-guide)
9. [Troubleshooting](#troubleshooting)
10. [Contributing Guidelines](#contributing-guidelines)

---

## 🎯 Project Overview

### Purpose
A comprehensive window configurator system that allows customers to customize windows with real-time pricing, visual previews, and automated order processing.

### Key Features
- **Dynamic Configuration**: Step-by-step window customization
- **Real-time Pricing**: Live price calculations based on selections
- **Visual Preview**: SVG-based window visualization
- **Authentication System**: User login/registration
- **PDF Generation**: Automated quote generation
- **Email Integration**: Order notifications to admin and customer
- **Admin Panel**: Complete configuration management
- **Responsive Design**: Mobile-friendly interface

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components

---

## 🏗️ System Architecture

### Project Structure
```
src/
├── components/           # React components
│   ├── AdminPanel.tsx   # Admin configuration management
│   ├── AuthModal.tsx    # Authentication modal
│   ├── Footer.tsx       # Site footer
│   ├── Homepage.tsx     # Landing page
│   ├── Navbar.tsx       # Navigation header
│   ├── PricingPanel.tsx # Price calculation display
│   ├── ShopPage.tsx     # Product catalog
│   ├── WindowConfigurator.tsx    # Main configurator
│   └── WindowVisualization.tsx   # SVG window preview
├── utils/               # Utility functions
│   ├── emailService.ts  # Email handling
│   └── pdfGenerator.ts  # PDF creation
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Data Flow
1. **User Input** → WindowConfigurator component
2. **Configuration State** → PricingPanel & WindowVisualization
3. **Order Submission** → Authentication → PDF Generation → Email Service
4. **Admin Changes** → Configuration Updates → Real-time UI Updates

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd window-configurator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_ADMIN_EMAIL=admin@trendhome-fenster.de
VITE_COMPANY_NAME=TrendHome Fenster
VITE_COMPANY_PHONE=+49 (0) 179 74 25361
```

---

## 📦 Component Documentation

### 1. App.tsx
**Purpose**: Main application component with routing setup

**Key Features**:
- React Router configuration
- Global state management for configurator config
- Layout structure with Navbar and Footer

**Props**: None

**State**:
- `configuratorConfig`: Global configuration from admin panel

### 2. WindowConfigurator.tsx
**Purpose**: Main configurator interface with step-by-step customization

**Key Features**:
- 7-step configuration wizard
- Real-time state management
- Authentication integration
- Order submission handling

**Props**:
- `config?: ConfiguratorConfig` - Configuration from admin panel

**State**:
- `currentStep`: Current wizard step (0-6)
- `configuration`: Complete window configuration
- `showPreview`: Toggle for window preview
- `isAuthenticated`: User authentication status

**Steps**:
1. Manufacturer & Material Selection
2. Window Type Selection
3. Opening Configuration
4. Dimensions Input
5. Glass & Colors Selection
6. Additional Options
7. Customer Info & Review

### 3. AdminPanel.tsx
**Purpose**: Dynamic configuration management for administrators

**Key Features**:
- CRUD operations for all configuration items
- Tabbed interface for different categories
- Real-time price management
- Visual form builders

**Configuration Categories**:
- Manufacturers
- Materials
- Window Types
- Glass Types
- Colors
- Opening Types
- Roller Shutter Types
- Locking Options

**Props**:
- `onConfigUpdate: (config: any) => void` - Callback for configuration updates

### 4. AuthModal.tsx
**Purpose**: User authentication (login/registration)

**Key Features**:
- Toggle between login and registration
- Form validation
- User data collection
- Integration with order system

**Props**:
- `isOpen: boolean` - Modal visibility
- `onClose: () => void` - Close callback
- `onAuthSuccess: (userData: any) => void` - Success callback

### 5. WindowVisualization.tsx
**Purpose**: SVG-based window preview

**Key Features**:
- Dynamic SVG generation
- Interior and exterior views
- Real-time configuration updates
- Dimension display

**Props**:
- `configuration: any` - Current window configuration

### 6. PricingPanel.tsx
**Purpose**: Real-time price calculation and display

**Key Features**:
- Dynamic price calculations
- Detailed price breakdown
- Size-based multipliers
- Configuration-based pricing

**Props**:
- `configuration: any` - Current window configuration
- `config?: any` - Admin configuration for pricing

### 7. ShopPage.tsx
**Purpose**: Product catalog with configurator links

**Key Features**:
- Product grid display
- Direct configurator links with pre-selected materials
- Responsive design

### 8. Homepage.tsx
**Purpose**: Landing page with company information

**Key Features**:
- Hero section
- Company features
- Services overview
- Customer testimonials

---

## ⚙️ Features & Functionality

### Configuration System

#### Manufacturer Selection
- **Available Options**: Salamander 82, Salamander 76, AluPlast, Gealan, AluProf, Eco Wood 86
- **Material Compatibility**: Each manufacturer supports specific materials
- **Pricing**: Individual base prices for each manufacturer

#### Material Options
- **PVC**: Compatible with most manufacturers
- **Aluminium**: Only for AluProf
- **Wood**: Only for Eco Wood 86

#### Window Types
1. **Single-sash Window**
   - Left/Right opening configurations
   - Top/Bottom light options
   - Fixed window option

2. **Double-sash Window**
   - Individual sash configurations
   - Fixed sash options
   - Stulp (French Mullion) support
   - Symmetrical/Asymmetrical divisions

3. **Balcony Door**
   - Minimum height: 1800mm
   - Same opening options as windows

4. **Sliding Door**
   - Left/Right sliding directions

5. **Entrance Door**
   - DIN Left/Right configurations
   - Side light options (left/right)
   - Top light support

#### Opening Mechanisms
- **Tilt**: Top-hinged opening
- **Turn**: Side-hinged opening
- **Tilt-Turn**: Combined mechanism
- **Fixed**: Non-opening

#### Additional Options
- **Glass Types**: Double glazing, Triple glazing, PVC Panel
- **Colors**: White, Brown, Anthracite, Golden Oak (interior/exterior)
- **Roller Shutters**: Top-mounted, Built-in, Surface-mounted
- **Controls**: Manual, Electric with switch, Electric with remote
- **Locking**: Standard handle, Handle with button, Handle with key

### Pricing System

#### Price Calculation Logic
```typescript
basePrice = manufacturerPrice + materialPrice + windowTypePrice
additionalOptions = glassPrice + colorPrices + openingPrices + shutterPrice + lockingPrice
sizeMultiplier = (width × height) / 1,000,000 // Convert to m²
finalPrice = (basePrice + additionalOptions) × max(sizeMultiplier, 0.5)
```

#### Dynamic Pricing
- All prices configurable through admin panel
- Real-time updates across the system
- Size-based multipliers
- Minimum area charge (0.5m²)

### Authentication System

#### User Registration
- Required fields: Name, Email, Phone, Address, Password
- Email validation
- Password strength requirements
- Automatic login after registration

#### User Login
- Email and password authentication
- Session management
- User data persistence

#### Order Integration
- Authentication required for order submission
- User data auto-fills customer information
- Secure order processing

### PDF Generation

#### Document Structure
1. **Header**: Company information and order details
2. **Customer Information**: Name, contact details, address
3. **Configuration Details**: Complete specification list
4. **Pricing**: Itemized price breakdown
5. **Visual**: SVG representations (if applicable)
6. **Footer**: Terms and contact information

#### Generated Content
- Order number (timestamp-based)
- Order date
- Complete configuration summary
- Price breakdown
- Customer information
- Professional formatting

### Email System

#### Admin Notification
- **Subject**: "New Window Order Request - [Customer Name]"
- **Content**: Complete order details and customer information
- **Attachment**: Generated PDF

#### Customer Confirmation
- **Subject**: "Order Confirmation - TrendHome Fenster"
- **Content**: Order summary and next steps
- **Attachment**: Generated PDF
- **Contact Information**: Support details

---

## 🔧 API Documentation

### Configuration Management

#### Admin Configuration Structure
```typescript
interface ConfiguratorConfig {
  manufacturers: Manufacturer[];
  materials: Material[];
  windowTypes: WindowType[];
  glassTypes: GlassType[];
  colors: Color[];
  openingTypes: OpeningType[];
  rollerShutterTypes: RollerShutterType[];
  lockingOptions: LockingOption[];
}
```

#### Data Models

##### Manufacturer
```typescript
interface Manufacturer {
  id: string;
  name: string;
  materials: string[]; // Compatible material IDs
  basePrice: number;
}
```

##### Material
```typescript
interface Material {
  id: string;
  name: string;
  price: number;
  color: string; // Hex color code
}
```

##### WindowType
```typescript
interface WindowType {
  id: string;
  name: string;
  price: number;
  description: string;
  minHeight?: number; // For doors
}
```

### Configuration State

#### Main Configuration Object
```typescript
interface ConfigurationState {
  manufacturer: string;
  material: string;
  windowType: string;
  dimensions: { width: number; height: number };
  glassType: string;
  interiorColor: string;
  exteriorColor: string;
  rollerShutter: boolean;
  rollerShutterType: string;
  rollerShutterControl: string;
  lockingOption: string;
  leftOpening: string;
  rightOpening: string;
  topLight: boolean;
  bottomLight: boolean;
  sideLight: { left: boolean; right: boolean; leftWidth: number; rightWidth: number };
  topLightDoor: boolean;
  customerInfo: CustomerInfo;
}
```

---

## 🗄️ Database Schema

### Configuration Storage
Currently using local state management. For production, consider:

#### Manufacturers Table
```sql
CREATE TABLE manufacturers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Materials Table
```sql
CREATE TABLE materials (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  color VARCHAR(7) NOT NULL, -- Hex color
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Manufacturer_Materials (Junction Table)
```sql
CREATE TABLE manufacturer_materials (
  manufacturer_id VARCHAR(50),
  material_id VARCHAR(50),
  PRIMARY KEY (manufacturer_id, material_id),
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id),
  FOREIGN KEY (material_id) REFERENCES materials(id)
);
```

### Order Storage
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20),
  customer_address TEXT,
  configuration JSON NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'processing', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deployment Guide

### Production Build
```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Environment Setup
1. Set up production environment variables
2. Configure email service (SMTP settings)
3. Set up database (if using persistent storage)
4. Configure domain and SSL

### Deployment Options

#### Netlify Deployment
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

#### Vercel Deployment
1. Connect repository to Vercel
2. Framework preset: Vite
3. Configure environment variables
4. Deploy

#### Traditional Hosting
1. Build the project: `npm run build`
2. Upload `dist` folder to web server
3. Configure web server for SPA routing
4. Set up SSL certificate

---

## 🔍 Troubleshooting

### Common Issues

#### Build Errors
- **Issue**: TypeScript compilation errors
- **Solution**: Check type definitions and imports

#### Routing Issues
- **Issue**: 404 errors on page refresh
- **Solution**: Configure server for SPA routing

#### PDF Generation Problems
- **Issue**: PDF not generating correctly
- **Solution**: Check jsPDF version compatibility

#### Email Service Issues
- **Issue**: Emails not sending
- **Solution**: Verify SMTP configuration and credentials

### Debug Mode
Enable debug logging by setting:
```typescript
const DEBUG = process.env.NODE_ENV === 'development';
```

### Performance Optimization
- Lazy load components
- Optimize SVG rendering
- Implement caching for configuration data
- Minimize bundle size

---

## 🤝 Contributing Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Write descriptive commit messages

### Development Workflow
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation
4. Submit pull request
5. Code review and merge

### Testing
- Unit tests for utility functions
- Component testing for React components
- Integration tests for user flows
- E2E tests for critical paths

### Code Review Checklist
- [ ] Code follows project standards
- [ ] TypeScript types are properly defined
- [ ] Components are properly documented
- [ ] Error handling is implemented
- [ ] Performance considerations addressed
- [ ] Accessibility guidelines followed

---

## 📞 Support & Contact

### Technical Support
- **Email**: dev-support@trendhome-fenster.de
- **Documentation**: This README file
- **Issues**: GitHub Issues section

### Business Contact
- **Company**: TrendHome Fenster
- **Phone**: +49 (0) 179 74 25361
- **Email**: info@trendhome-fenster.de
- **Address**: Sigmaringerstraße 24, Max-Eyth-Str. 19B 71332 Waiblingen

---

## 📄 License

This project is proprietary software developed for TrendHome Fenster. All rights reserved.

---

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial release with complete configurator system
- Admin panel for dynamic configuration
- Authentication system
- PDF generation and email integration
- Responsive design implementation

### Planned Features
- Database integration
- Advanced reporting


---

*Last Updated: [Current Date]*
*Documentation Version: 1.0.0*
