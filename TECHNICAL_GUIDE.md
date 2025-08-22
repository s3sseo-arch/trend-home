# Technical Implementation Guide

## 🔧 Component Architecture Deep Dive

### WindowConfigurator.tsx - Core Logic

#### State Management
```typescript
// Main configuration state structure
const [configuration, setConfiguration] = useState<ConfigurationState>({
  manufacturer: '',
  material: '',
  windowType: '',
  dimensions: { width: 1000, height: 1200 },
  // ... other properties
});

// Step management
const [currentStep, setCurrentStep] = useState(0);
const steps = [
  'Manufacturer & Material',
  'Window Type',
  'Opening Configuration',
  'Dimensions',
  'Glass & Colors',
  'Additional Options',
  'Customer Info & Review'
];
```

#### Key Functions
```typescript
// Update configuration helper
const updateConfiguration = (key: string, value: any) => {
  setConfiguration(prev => ({ ...prev, [key]: value }));
};

// Get available materials based on manufacturer
const getAvailableMaterials = () => {
  if (!configuration.manufacturer) return [];
  const manufacturer = config.manufacturers.find(m => m.id === configuration.manufacturer);
  return manufacturer?.materials || [];
};

// Handle order submission with authentication
const handleOrderSubmit = async () => {
  if (!isAuthenticated) {
    setShowAuthModal(true);
    return;
  }
  // Generate PDF and send emails
};
```

### AdminPanel.tsx - Dynamic Configuration

#### CRUD Operations
```typescript
// Add new item
const handleAdd = () => {
  const id = `${activeTab}_${Date.now()}`;
  const item = { ...newItem, id };
  setConfig(prev => ({
    ...prev,
    [activeTab]: [...prev[activeTab], item]
  }));
};

// Edit existing item
const handleEdit = (item: any) => {
  setEditingItem({ ...item });
  setIsEditing(true);
};

// Save changes
const handleSave = () => {
  setConfig(prev => ({
    ...prev,
    [activeTab]: prev[activeTab].map((item: any) =>
      item.id === editingItem.id ? editingItem : item
    )
  }));
};
```

#### Dynamic Form Rendering
```typescript
const renderFormFields = (item: any, isNew = false) => {
  switch (activeTab) {
    case 'manufacturers':
      return (
        <>
          {/* Name and price fields */}
          <div>
            <label>Compatible Materials</label>
            {config.materials.map(material => (
              <label key={material.id}>
                <input
                  type="checkbox"
                  checked={item.materials?.includes(material.id)}
                  onChange={(e) => {
                    // Handle material selection
                  }}
                />
                {material.name}
              </label>
            ))}
          </div>
        </>
      );
    // ... other cases
  }
};
```

### WindowVisualization.tsx - SVG Generation

#### Dynamic SVG Rendering
```typescript
const renderWindow = (isExterior = false) => {
  const frameColor = getColorHex(isExterior ? exteriorColor : interiorColor);
  const width = Math.min(dimensions.width / 5, 200);
  const height = Math.min(dimensions.height / 5, 240);

  return (
    <svg width={width + 40} height={height + 80}>
      {/* Roller Shutter */}
      {rollerShutter && (
        <rect x="15" y="10" width={width + 10} height="15" fill="#999" />
      )}
      
      {/* Main Frame */}
      <rect
        x="20" y="20"
        width={width} height={height}
        fill={frameColor}
        stroke="#666"
        strokeWidth="2"
      />
      
      {/* Glass Area */}
      <rect
        x="30" y="30"
        width={width - 20} height={height - 20}
        fill="rgba(173, 216, 230, 0.3)"
        stroke="#87CEEB"
      />
      
      {/* Window Type Specific Elements */}
      {windowType === 'double-sash' && (
        <line
          x1={width / 2 + 20} y1="30"
          x2={width / 2 + 20} y2={height + 10}
          stroke="#666" strokeWidth="2"
        />
      )}
    </svg>
  );
};
```

### PricingPanel.tsx - Price Calculations

#### Price Calculation Logic
```typescript
const calculatePrice = () => {
  let price = 0;
  
  // Base manufacturer price
  if (configuration.manufacturer) {
    price += getPrice('manufacturers', configuration.manufacturer, 150);
  }
  
  // Material addon
  if (configuration.material) {
    price += getPrice('materials', configuration.material, 0);
  }
  
  // Size multiplier
  const area = (configuration.dimensions.width * configuration.dimensions.height) / 1000000;
  price *= Math.max(area, 0.5);
  
  return Math.round(price * 100) / 100;
};

// Get price from config or use default
const getPrice = (category: string, id: string, fallback: number = 0) => {
  if (config && config[category]) {
    const item = config[category].find((item: any) => item.id === id);
    return item ? (item.price || item.basePrice || 0) : fallback;
  }
  return defaultBasePrices[category]?.[id] || fallback;
};
```

## 🔄 Data Flow Architecture

### Configuration Flow
```
AdminPanel → Config State → WindowConfigurator → PricingPanel
                        ↓
                   WindowVisualization
```

### Order Processing Flow
```
User Input → Configuration → Authentication → PDF Generation → Email Service
```

### State Management Pattern
```typescript
// Parent component (App.tsx)
const [configuratorConfig, setConfiguratorConfig] = useState(null);

// Admin updates config
const handleConfigUpdate = (config: any) => {
  setConfiguratorConfig(config);
};

// Pass config to configurator
<WindowConfigurator config={configuratorConfig} />
```

## 🎨 Styling Architecture

### Tailwind CSS Classes Used

#### Layout Classes
```css
/* Grid layouts */
.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.gap-4

/* Flexbox layouts */
.flex.items-center.justify-between.space-x-4

/* Responsive spacing */
.p-4.md:p-6.lg:p-8
.m-4.md:m-6.lg:m-8
```

#### Component Styling
```css
/* Buttons */
.bg-blue-600.hover:bg-blue-700.text-white.px-4.py-2.rounded-lg.transition-colors

/* Cards */
.bg-white.rounded-lg.shadow-sm.p-6

/* Forms */
.w-full.p-3.border.border-gray-300.rounded-lg.focus:ring-2.focus:ring-blue-500
```

#### Color Scheme
```css
/* Primary Colors */
--blue-600: #2563eb;
--blue-700: #1d4ed8;

/* Secondary Colors */
--teal-500: #14b8a6;
--teal-600: #0d9488;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-600: #4b5563;
--gray-800: #1f2937;
```

## 📱 Responsive Design Implementation

### Breakpoint Strategy
```css
/* Mobile First Approach */
.grid-cols-1          /* Default: Mobile */
.md:grid-cols-2       /* Tablet: 768px+ */
.lg:grid-cols-3       /* Desktop: 1024px+ */
.xl:grid-cols-4       /* Large Desktop: 1280px+ */
```

### Component Responsiveness
```typescript
// Responsive SVG sizing
const width = Math.min(dimensions.width / 5, 200);
const height = Math.min(dimensions.height / 5, 240);

// Responsive modal
<div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
```

## 🔐 Security Considerations

### Input Validation
```typescript
// Form validation example
const validateForm = () => {
  const newErrors: any = {};
  
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  
  if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  
  return Object.keys(newErrors).length === 0;
};
```

### Data Sanitization
```typescript
// Sanitize user input
const sanitizeInput = (input: string) => {
  return input.trim().replace(/[<>]/g, '');
};
```

## 🚀 Performance Optimizations

### Component Optimization
```typescript
// Memoize expensive calculations
const totalPrice = useMemo(() => calculatePrice(), [configuration]);

// Debounce user input
const debouncedUpdateDimensions = useCallback(
  debounce((dimensions) => updateConfiguration('dimensions', dimensions), 300),
  []
);
```

### Bundle Optimization
```typescript
// Lazy loading components
const AdminPanel = lazy(() => import('./components/AdminPanel'));

// Code splitting
<Suspense fallback={<div>Loading...</div>}>
  <AdminPanel />
</Suspense>
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Test price calculation
describe('PricingPanel', () => {
  test('calculates price correctly', () => {
    const config = { manufacturer: 'salamander82', material: 'pvc' };
    const price = calculatePrice(config);
    expect(price).toBeGreaterThan(0);
  });
});
```

### Integration Tests
```typescript
// Test configurator flow
describe('WindowConfigurator', () => {
  test('completes configuration flow', async () => {
    render(<WindowConfigurator />);
    
    // Select manufacturer
    fireEvent.click(screen.getByText('Salamander 82'));
    
    // Navigate through steps
    fireEvent.click(screen.getByText('Next'));
    
    // Verify final step
    expect(screen.getByText('Review & Submit')).toBeInTheDocument();
  });
});
```

## 📊 Analytics & Monitoring

### Error Tracking
```typescript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Configuration error:', error, errorInfo);
    // Send to monitoring service
  }
}
```

### Performance Monitoring
```typescript
// Performance tracking
const trackConfigurationTime = (step: number, duration: number) => {
  console.log(`Step ${step} completed in ${duration}ms`);
  // Send to analytics service
};
```

## 🔧 Development Tools

### Debugging Utilities
```typescript
// Debug configuration state
const debugConfig = () => {
  if (process.env.NODE_ENV === 'development') {
    console.table(configuration);
  }
};

// Performance profiling
const ProfiledComponent = React.memo(Component);
```

### Development Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit"
  }
}
```

This technical guide provides deep implementation details for developers working on the window configurator system.