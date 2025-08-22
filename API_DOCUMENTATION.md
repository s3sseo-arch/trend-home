# API Documentation - Window Configurator System

## 📡 Overview

This document outlines all the APIs, interfaces, and data structures used in the Window Configurator System.

## 🏗️ Core Interfaces

### ConfiguratorConfig
Main configuration interface that defines all available options.

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

### Manufacturer
```typescript
interface Manufacturer {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  materials: string[];           // Compatible material IDs
  basePrice: number;            // Base price in EUR
  description?: string;         // Optional description
}

// Example
{
  id: 'salamander82',
  name: 'Salamander 82',
  materials: ['pvc'],
  basePrice: 150,
  description: 'Premium PVC window system'
}
```

### Material
```typescript
interface Material {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  price: number;                 // Additional price in EUR
  color: string;                 // Hex color code
  description?: string;          // Optional description
}

// Example
{
  id: 'pvc',
  name: 'PVC',
  price: 0,
  color: '#FFFFFF',
  description: 'Durable PVC material'
}
```

### WindowType
```typescript
interface WindowType {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  price: number;                 // Additional price in EUR
  description: string;           // Description
  minHeight?: number;           // Minimum height in mm (for doors)
  maxHeight?: number;           // Maximum height in mm
  minWidth?: number;            // Minimum width in mm
  maxWidth?: number;            // Maximum width in mm
}

// Example
{
  id: 'single-sash',
  name: 'Single-sash Window',
  price: 0,
  description: 'Single opening window',
  minHeight: 500,
  maxHeight: 2500
}
```

### GlassType
```typescript
interface GlassType {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  price: number;                 // Additional price in EUR
  description: string;           // Description
  uValue?: number;              // U-value for insulation
  thickness?: number;           // Glass thickness in mm
}

// Example
{
  id: 'triple',
  name: 'Triple Glazing',
  price: 80,
  description: 'Enhanced insulation',
  uValue: 0.6,
  thickness: 44
}
```

### Color
```typescript
interface Color {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  color: string;                 // Hex color code
  price: number;                 // Additional price in EUR
  category?: 'standard' | 'premium' | 'special';
}

// Example
{
  id: 'anthracite',
  name: 'Anthracite',
  color: '#2F4F4F',
  price: 40,
  category: 'premium'
}
```

### OpeningType
```typescript
interface OpeningType {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  price: number;                 // Additional price in EUR
  description: string;           // Description
  mechanism: 'tilt' | 'turn' | 'tilt-turn' | 'fixed' | 'sliding';
}

// Example
{
  id: 'tilt-turn',
  name: 'Tilt-Turn',
  price: 40,
  description: 'Combined tilt and turn mechanism',
  mechanism: 'tilt-turn'
}
```

### RollerShutterType
```typescript
interface RollerShutterType {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  price: number;                 // Additional price in EUR
  description: string;           // Description
  installation: 'top-mounted' | 'built-in' | 'surface-mounted';
  controlOptions: string[];      // Available control types
}

// Example
{
  id: 'built-in',
  name: 'Built-in',
  price: 180,
  description: 'Integrated into frame',
  installation: 'built-in',
  controlOptions: ['manual', 'electric-switch', 'electric-remote']
}
```

### LockingOption
```typescript
interface LockingOption {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  price: number;                 // Additional price in EUR
  description: string;           // Description
  securityLevel: 1 | 2 | 3 | 4 | 5;  // Security rating
}

// Example
{
  id: 'key',
  name: 'Handle with Key',
  price: 50,
  description: 'Key lock handle',
  securityLevel: 4
}
```

## 🔧 Configuration State

### ConfigurationState
Complete window configuration state.

```typescript
interface ConfigurationState {
  // Basic Configuration
  manufacturer: string;
  material: string;
  windowType: string;
  
  // Dimensions
  dimensions: {
    width: number;               // Width in mm
    height: number;              // Height in mm
  };
  
  // Glass and Colors
  glassType: string;
  interiorColor: string;
  exteriorColor: string;
  
  // Opening Configuration
  leftOpening: string;           // Opening type for left sash
  rightOpening: string;          // Opening type for right sash
  
  // Additional Features
  rollerShutter: boolean;
  rollerShutterType: string;
  rollerShutterControl: string;
  lockingOption: string;
  
  // Lights and Extensions
  topLight: boolean;
  topLightHeight: number;        // Height in mm
  bottomLight: boolean;
  bottomLightHeight: number;     // Height in mm
  
  // Door Specific
  sideLight: {
    left: boolean;
    right: boolean;
    leftWidth: number;           // Width in mm
    rightWidth: number;          // Width in mm
  };
  topLightDoor: boolean;
  topLightDoorHeight: number;    // Height in mm
  doorType: string;              // 'din-left' | 'din-right'
  
  // Window Specific
  sashConfig: string;            // 'symmetrical' | 'asymmetrical'
  fixedSash: string;             // 'left' | 'right' | ''
  stulp: string;                 // 'left' | 'right' | ''
  
  // Sliding Door Specific
  slidingDirection: string;      // 'left' | 'right'
  
  // Customer Information
  customerInfo: CustomerInfo;
}
```

### CustomerInfo
```typescript
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}
```

## 📊 Pricing API

### Price Calculation
```typescript
interface PriceBreakdown {
  basePrice: number;             // Manufacturer base price
  materialPrice: number;         // Material additional cost
  windowTypePrice: number;       // Window type additional cost
  glassPrice: number;           // Glass type additional cost
  colorPrice: number;           // Color additional cost
  openingPrice: number;         // Opening mechanism cost
  shutterPrice: number;         // Roller shutter cost
  lockingPrice: number;         // Locking option cost
  additionalFeatures: number;   // Other features cost
  sizeMultiplier: number;       // Size-based multiplier
  totalPrice: number;           // Final calculated price
}

// Price calculation function
function calculatePrice(
  configuration: ConfigurationState,
  config: ConfiguratorConfig
): PriceBreakdown;
```

### Default Pricing Structure
```typescript
const defaultBasePrices = {
  manufacturers: {
    salamander82: 150,
    salamander76: 140,
    aluplast: 130,
    gealan: 160,
    aluprof: 200,
    ecowood86: 250
  },
  materials: {
    pvc: 0,
    aluminium: 50,
    wood: 100
  },
  windowTypes: {
    'single-sash': 0,
    'double-sash': 80,
    'balcony-door': 120,
    'sliding-door': 100,
    'entrance-door': 300
  },
  glassTypes: {
    double: 0,
    triple: 80,
    'pvc-panel': -20
  },
  colors: {
    white: 0,
    brown: 30,
    anthracite: 40,
    'golden-oak': 50
  },
  openingTypes: {
    tilt: 20,
    turn: 25,
    'tilt-turn': 40,
    fixed: 0
  },
  additions: {
    rollerShutter: 150,
    rollerShutterElectric: 100,
    handleButton: 25,
    handleKey: 50,
    topLight: 80,
    bottomLight: 80,
    sideLight: 120,
    topLightDoor: 100
  }
};
```

## 🔐 Authentication API

### AuthData
```typescript
interface AuthData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password?: string;             // Only for registration
}

interface AuthResponse {
  success: boolean;
  user?: CustomerInfo;
  error?: string;
}

// Authentication functions
function login(email: string, password: string): Promise<AuthResponse>;
function register(authData: AuthData): Promise<AuthResponse>;
function logout(): void;
```

## 📄 PDF Generation API

### PDFConfig
```typescript
interface PDFConfig {
  configuration: ConfigurationState;
  priceBreakdown: PriceBreakdown;
  orderNumber: string;
  orderDate: string;
}

interface PDFOptions {
  includeImages: boolean;        // Include SVG images
  includeBreakdown: boolean;     // Include price breakdown
  format: 'a4' | 'letter';      // Paper format
  orientation: 'portrait' | 'landscape';
}

// PDF generation function
function generatePDF(
  config: PDFConfig,
  options?: PDFOptions
): Promise<Blob>;
```

## 📧 Email Service API

### EmailConfig
```typescript
interface EmailConfig {
  to: string;
  subject: string;
  body: string;
  attachment?: Blob;
  isHTML?: boolean;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email functions
function sendOrderEmail(
  configuration: ConfigurationState,
  pdfBlob: Blob,
  userData: CustomerInfo
): Promise<EmailResponse>;

function sendAdminNotification(
  configuration: ConfigurationState,
  userData: CustomerInfo
): Promise<EmailResponse>;
```

## 🎨 Visualization API

### SVGConfig
```typescript
interface SVGConfig {
  width: number;
  height: number;
  showDimensions: boolean;
  showLabels: boolean;
  style: 'interior' | 'exterior';
}

interface SVGElement {
  type: 'rect' | 'line' | 'circle' | 'text';
  attributes: Record<string, string | number>;
  content?: string;
}

// SVG generation function
function generateWindowSVG(
  configuration: ConfigurationState,
  config: SVGConfig
): SVGElement[];
```

## 🔄 State Management API

### ConfigurationActions
```typescript
type ConfigurationAction = 
  | { type: 'SET_MANUFACTURER'; payload: string }
  | { type: 'SET_MATERIAL'; payload: string }
  | { type: 'SET_WINDOW_TYPE'; payload: string }
  | { type: 'SET_DIMENSIONS'; payload: { width: number; height: number } }
  | { type: 'SET_GLASS_TYPE'; payload: string }
  | { type: 'SET_COLORS'; payload: { interior: string; exterior: string } }
  | { type: 'SET_OPENING'; payload: { side: 'left' | 'right'; type: string } }
  | { type: 'TOGGLE_ROLLER_SHUTTER'; payload: boolean }
  | { type: 'SET_LOCKING_OPTION'; payload: string }
  | { type: 'RESET_CONFIGURATION' };

// Reducer function
function configurationReducer(
  state: ConfigurationState,
  action: ConfigurationAction
): ConfigurationState;
```

## 🔍 Validation API

### ValidationRules
```typescript
interface ValidationRule {
  field: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Validation functions
function validateConfiguration(
  configuration: ConfigurationState,
  rules: ValidationRule[]
): ValidationResult;

function validateDimensions(
  width: number,
  height: number,
  windowType: string
): ValidationResult;
```

## 📱 Component Props API

### WindowConfigurator Props
```typescript
interface WindowConfiguratorProps {
  config?: ConfiguratorConfig;
  initialConfiguration?: Partial<ConfigurationState>;
  onConfigurationChange?: (config: ConfigurationState) => void;
  onOrderSubmit?: (config: ConfigurationState) => void;
}
```

### AdminPanel Props
```typescript
interface AdminPanelProps {
  onConfigUpdate: (config: ConfiguratorConfig) => void;
  initialConfig?: ConfiguratorConfig;
  permissions?: {
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
  };
}
```

### PricingPanel Props
```typescript
interface PricingPanelProps {
  configuration: ConfigurationState;
  config?: ConfiguratorConfig;
  showBreakdown?: boolean;
  currency?: string;
  onPriceCalculated?: (price: number) => void;
}
```

## 🚀 API Usage Examples

### Basic Configuration Setup
```typescript
// Initialize configurator
const configurator = new WindowConfigurator({
  config: adminConfig,
  onConfigurationChange: (config) => {
    console.log('Configuration updated:', config);
  }
});

// Set manufacturer
configurator.setManufacturer('salamander82');

// Set material (automatically filtered by manufacturer)
configurator.setMaterial('pvc');

// Calculate price
const price = configurator.calculatePrice();
```

### Admin Configuration Management
```typescript
// Add new manufacturer
const newManufacturer: Manufacturer = {
  id: 'new-manufacturer',
  name: 'New Manufacturer',
  materials: ['pvc', 'aluminium'],
  basePrice: 175
};

adminPanel.addManufacturer(newManufacturer);

// Update pricing
adminPanel.updatePrice('manufacturers', 'salamander82', 160);
```

### Order Processing
```typescript
// Submit order
const orderResult = await submitOrder({
  configuration: currentConfiguration,
  customerInfo: userInfo
});

if (orderResult.success) {
  // Generate PDF
  const pdf = await generatePDF({
    configuration: currentConfiguration,
    priceBreakdown: orderResult.pricing,
    orderNumber: orderResult.orderNumber,
    orderDate: new Date().toISOString()
  });
  
  // Send emails
  await sendOrderEmail(currentConfiguration, pdf, userInfo);
}
```

This API documentation provides comprehensive information for developers working with the Window Configurator System.