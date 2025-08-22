import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Mail, Eye, EyeOff } from 'lucide-react';
import ApiService from '../services/api.js';
import WindowVisualization from './WindowVisualization';
import PricingPanel from './PricingPanel';
import AuthModal from './AuthModal';
import { generatePDF } from '../utils/pdfGenerator';

interface ConfiguratorConfig {
  manufacturers: any[];
  materials: any[];
  windowTypes: any[];
  glassTypes: any[];
  colors: any[];
  openingTypes: any[];
  rollerShutterTypes: any[];
  lockingOptions: any[];
}

interface ConfigurationState {
  manufacturer: string;
  material: string;
  windowType: string;
  openingType: string;
  dimensions: { width: number; height: number };
  glassType: string;
  interiorColor: string;
  exteriorColor: string;
  rollerShutter: boolean;
  rollerShutterType: string;
  lockingOption: string;
  additionalOptions: any[];
  leftOpening: string;
  rightOpening: string;
  sashConfig: string;
  topLight: boolean;
  topLightHeight: number;
  bottomLight: boolean;
  bottomLightHeight: number;
  fixedSash: string;
  stulp: string;
  doorType: string;
  sideLight: { left: boolean; right: boolean; leftWidth: number; rightWidth: number };
  topLightDoor: boolean;
  topLightDoorHeight: number;
  slidingDirection: string;
  rollerShutterControl: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

interface WindowConfiguratorProps {
  config?: ConfiguratorConfig;
}

const WindowConfigurator: React.FC<WindowConfiguratorProps> = ({ config: externalConfig }) => {
  const [searchParams] = useSearchParams();
  const initialMaterial = searchParams.get('material') || '';
  
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Default configuration
  const defaultConfig: ConfiguratorConfig = {
    manufacturers: [
      { id: 'salamander82', name: 'Salamander 82', materials: ['pvc'], basePrice: 150 },
      { id: 'salamander76', name: 'Salamander 76', materials: ['pvc'], basePrice: 140 },
      { id: 'aluplast', name: 'AluPlast', materials: ['pvc'], basePrice: 130 },
      { id: 'gealan', name: 'Gealan', materials: ['pvc'], basePrice: 160 },
      { id: 'aluprof', name: 'AluProf', materials: ['aluminium'], basePrice: 200 },
      { id: 'ecowood86', name: 'Eco Wood 86', materials: ['wood'], basePrice: 250 }
    ],
    materials: [
      { id: 'pvc', name: 'PVC', price: 0, color: '#FFFFFF' },
      { id: 'aluminium', name: 'Aluminium', price: 50, color: '#C0C0C0' },
      { id: 'wood', name: 'Wood', price: 100, color: '#8B4513' }
    ],
    windowTypes: [
      { id: 'single-sash', name: 'Single-sash Window', price: 0, description: 'Single opening window' },
      { id: 'double-sash', name: 'Double-sash Window', price: 80, description: 'Two-panel window' },
      { id: 'balcony-door', name: 'Balcony Door', price: 120, description: 'Door to balcony', minHeight: 1800 },
      { id: 'sliding-door', name: 'Sliding Door', price: 100, description: 'Sliding panel door' },
      { id: 'entrance-door', name: 'Entrance Door', price: 300, description: 'Main entrance door', minHeight: 1800 }
    ],
    glassTypes: [
      { id: 'double', name: 'Double Glazing', price: 0, description: 'Standard double glazing' },
      { id: 'triple', name: 'Triple Glazing', price: 80, description: 'Enhanced insulation' },
      { id: 'pvc-panel', name: 'PVC Panel', price: -20, description: 'Solid PVC panel' }
    ],
    colors: [
      { id: 'white', name: 'White', color: '#FFFFFF', price: 0 },
      { id: 'brown', name: 'Brown', color: '#8B4513', price: 30 },
      { id: 'anthracite', name: 'Anthracite', color: '#2F4F4F', price: 40 },
      { id: 'golden-oak', name: 'Golden Oak', color: '#DAA520', price: 50 }
    ],
    openingTypes: [
      { id: 'tilt', name: 'Tilt', price: 20, description: 'Tilt opening mechanism' },
      { id: 'turn', name: 'Turn', price: 25, description: 'Turn opening mechanism' },
      { id: 'tilt-turn', name: 'Tilt-Turn', price: 40, description: 'Combined tilt and turn' },
      { id: 'fixed', name: 'Fixed', price: 0, description: 'Non-opening window' }
    ],
    rollerShutterTypes: [
      { id: 'top-mounted', name: 'Top-mounted', price: 150, description: 'Mounted above window' },
      { id: 'built-in', name: 'Built-in', price: 180, description: 'Integrated into frame' },
      { id: 'surface-mounted', name: 'Surface-mounted', price: 120, description: 'Surface installation' }
    ],
    lockingOptions: [
      { id: 'standard', name: 'Standard Handle', price: 0, description: 'Basic handle' },
      { id: 'button', name: 'Handle with Button', price: 25, description: 'Button lock handle' },
      { id: 'key', name: 'Handle with Key', price: 50, description: 'Key lock handle' }
    ]
  };

  const [config, setConfig] = useState(externalConfig || defaultConfig);

  useEffect(() => {
    loadConfiguration();
    // Set up polling to check for configuration updates
    const interval = setInterval(loadConfiguration, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (externalConfig) {
      setConfig(externalConfig);
    }
  }, [externalConfig]);

  const loadConfiguration = async () => {
    try {
      const configData = await ApiService.getConfiguration();
      if (configData && Object.keys(configData).length > 0) {
        setConfig(configData);
        console.log('Configuration loaded:', configData);
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      // Use default config if API fails
    }
  };
  
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    manufacturer: '',
    material: initialMaterial,
    windowType: '',
    openingType: '',
    dimensions: { width: 1000, height: 1200 },
    glassType: '',
    interiorColor: '',
    exteriorColor: '',
    rollerShutter: false,
    rollerShutterType: '',
    lockingOption: '',
    additionalOptions: [],
    leftOpening: '',
    rightOpening: '',
    sashConfig: '',
    topLight: false,
    topLightHeight: 200,
    bottomLight: false,
    bottomLightHeight: 200,
    fixedSash: '',
    stulp: '',
    doorType: '',
    sideLight: { left: false, right: false, leftWidth: 300, rightWidth: 300 },
    topLightDoor: false,
    topLightDoorHeight: 300,
    slidingDirection: '',
    rollerShutterControl: '',
    customerInfo: userData || {
      name: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const steps = [
    'Manufacturer & Material',
    'Window Type',
    'Opening Configuration',
    'Dimensions',
    'Glass & Colors',
    'Additional Options',
    'Customer Info & Review'
  ];

  const updateConfiguration = (key: string, value: any) => {
    setConfiguration(prev => ({ ...prev, [key]: value }));
  };

  const handleAuthSuccess = (authUserData: any) => {
    setIsAuthenticated(true);
    setUserData(authUserData);
    setConfiguration(prev => ({
      ...prev,
      customerInfo: authUserData
    }));
  };

  const handleOrderSubmit = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      setSubmitting(true);
      
      // Calculate pricing
      const pricing = calculatePricing();
      
      const orderData = {
        customerInfo: userData,
        configuration,
        pricing
      };

      const response = await ApiService.submitOrder(orderData);
      
      // Show success message
      alert(`Order submitted successfully! Order Number: ${response.orderNumber}. You and our admin will receive confirmation emails shortly.`);
      
      // Reset form or redirect
      setCurrentStep(0);
      setConfiguration({
        manufacturer: '',
        material: initialMaterial,
        windowType: '',
        openingType: '',
        dimensions: { width: 1000, height: 1200 },
        glassType: '',
        interiorColor: '',
        exteriorColor: '',
        rollerShutter: false,
        rollerShutterType: '',
        lockingOption: '',
        additionalOptions: [],
        leftOpening: '',
        rightOpening: '',
        sashConfig: '',
        topLight: false,
        topLightHeight: 200,
        bottomLight: false,
        bottomLightHeight: 200,
        fixedSash: '',
        stulp: '',
        doorType: '',
        sideLight: { left: false, right: false, leftWidth: 300, rightWidth: 300 },
        topLightDoor: false,
        topLightDoorHeight: 300,
        slidingDirection: '',
        rollerShutterControl: '',
        customerInfo: userData
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`There was an error submitting your order: ${error.message}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  const calculatePricing = () => {
    let basePrice = 0;
    let additionalCosts = 0;
    const breakdown = [];

    // Calculate based on configuration
    // This is a simplified version - you can expand this
    if (configuration.manufacturer) {
      const manufacturer = config.manufacturers.find(m => m.id === configuration.manufacturer);
      if (manufacturer) {
        basePrice = manufacturer.basePrice || 150;
        breakdown.push({ item: 'Base Price', price: basePrice });
      }
    }

    // Add material cost
    if (configuration.material) {
      const material = config.materials.find(m => m.id === configuration.material);
      if (material && material.price > 0) {
        additionalCosts += material.price;
        breakdown.push({ item: 'Material', price: material.price });
      }
    }

    // Size multiplier
    const area = (configuration.dimensions.width * configuration.dimensions.height) / 1000000;
    const sizeMultiplier = Math.max(area, 0.5);
    const totalPrice = (basePrice + additionalCosts) * sizeMultiplier;

    return {
      basePrice,
      additionalCosts,
      totalPrice: Math.round(totalPrice * 100) / 100,
      breakdown
    };
  };
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getAvailableMaterials = () => {
    if (!configuration.manufacturer) return [];
    const manufacturer = config.manufacturers.find(m => m.id === configuration.manufacturer);
    return manufacturer?.materials || [];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Manufacturer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.manufacturers.map(manufacturer => (
                  <button
                    key={manufacturer.id}
                    onClick={() => updateConfiguration('manufacturer', manufacturer.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      configuration.manufacturer === manufacturer.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{manufacturer.name}</div>
                    <div className="text-sm text-gray-500">
                      Materials: {manufacturer.materials.join(', ').toUpperCase()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {configuration.manufacturer && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Select Material</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getAvailableMaterials().map(materialId => {
                    const material = config.materials.find(m => m.id === materialId);
                    if (!material) return null;
                    return (
                    <button
                      key={material.id}
                      onClick={() => updateConfiguration('material', material.id)}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        configuration.material === material.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: material.color }}
                        />
                        <span>{material.name}</span>
                      </div>
                    </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Select Window Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.windowTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => updateConfiguration('windowType', type.id)}
                  className={`p-6 border-2 rounded-lg text-left transition-colors ${
                    configuration.windowType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-lg">{type.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Opening Configuration</h3>
            
            {configuration.windowType === 'single-sash' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Left Opening</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={configuration.leftOpening}
                      onChange={(e) => updateConfiguration('leftOpening', e.target.value)}
                    >
                      <option value="">Fixed</option>
                      {config.openingTypes.filter(ot => ot.id !== 'fixed').map(openingType => (
                        <option key={openingType.id} value={openingType.id}>
                          {openingType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Right Opening</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={configuration.rightOpening}
                      onChange={(e) => updateConfiguration('rightOpening', e.target.value)}
                    >
                      <option value="">Fixed</option>
                      {config.openingTypes.filter(ot => ot.id !== 'fixed').map(openingType => (
                        <option key={openingType.id} value={openingType.id}>
                          {openingType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={configuration.topLight}
                        onChange={(e) => updateConfiguration('topLight', e.target.checked)}
                        className="mr-2"
                      />
                      Top Light
                    </label>
                    {configuration.topLight && (
                      <input
                        type="number"
                        placeholder="Height in mm"
                        value={configuration.topLightHeight}
                        onChange={(e) => updateConfiguration('topLightHeight', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={configuration.bottomLight}
                        onChange={(e) => updateConfiguration('bottomLight', e.target.checked)}
                        className="mr-2"
                      />
                      Bottom Light
                    </label>
                    {configuration.bottomLight && (
                      <input
                        type="number"
                        placeholder="Height in mm"
                        value={configuration.bottomLightHeight}
                        onChange={(e) => updateConfiguration('bottomLightHeight', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {configuration.windowType === 'double-sash' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Left Sash</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={configuration.leftOpening}
                      onChange={(e) => updateConfiguration('leftOpening', e.target.value)}
                      disabled={configuration.fixedSash === 'left' || configuration.stulp === 'left'}
                    >
                      <option value="">Fixed</option>
                      {config.openingTypes.filter(ot => ot.id !== 'fixed').map(openingType => (
                        <option key={openingType.id} value={openingType.id}>
                          {openingType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Right Sash</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={configuration.rightOpening}
                      onChange={(e) => updateConfiguration('rightOpening', e.target.value)}
                      disabled={configuration.fixedSash === 'right' || configuration.stulp === 'right'}
                    >
                      <option value="">Fixed</option>
                      {config.openingTypes.filter(ot => ot.id !== 'fixed').map(openingType => (
                        <option key={openingType.id} value={openingType.id}>
                          {openingType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Fixed Sash</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={configuration.fixedSash}
                      onChange={(e) => {
                        updateConfiguration('fixedSash', e.target.value);
                        if (e.target.value) updateConfiguration('stulp', '');
                      }}
                    >
                      <option value="">None</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stulp (French Mullion)</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={configuration.stulp}
                      onChange={(e) => {
                        updateConfiguration('stulp', e.target.value);
                        if (e.target.value) updateConfiguration('fixedSash', '');
                      }}
                    >
                      <option value="">None</option>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {configuration.windowType === 'entrance-door' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Door Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateConfiguration('doorType', 'din-right')}
                      className={`p-4 border-2 rounded-lg ${
                        configuration.doorType === 'din-right'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      DIN Right
                    </button>
                    <button
                      onClick={() => updateConfiguration('doorType', 'din-left')}
                      className={`p-4 border-2 rounded-lg ${
                        configuration.doorType === 'din-left'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      DIN Left
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={configuration.sideLight.left}
                        onChange={(e) => updateConfiguration('sideLight', {
                          ...configuration.sideLight,
                          left: e.target.checked
                        })}
                        className="mr-2"
                      />
                      Side Light Left
                    </label>
                    {configuration.sideLight.left && (
                      <input
                        type="number"
                        placeholder="Width in mm"
                        value={configuration.sideLight.leftWidth}
                        onChange={(e) => updateConfiguration('sideLight', {
                          ...configuration.sideLight,
                          leftWidth: parseInt(e.target.value)
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={configuration.sideLight.right}
                        onChange={(e) => updateConfiguration('sideLight', {
                          ...configuration.sideLight,
                          right: e.target.checked
                        })}
                        className="mr-2"
                      />
                      Side Light Right
                    </label>
                    {configuration.sideLight.right && (
                      <input
                        type="number"
                        placeholder="Width in mm"
                        value={configuration.sideLight.rightWidth}
                        onChange={(e) => updateConfiguration('sideLight', {
                          ...configuration.sideLight,
                          rightWidth: parseInt(e.target.value)
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={configuration.topLightDoor}
                      onChange={(e) => updateConfiguration('topLightDoor', e.target.checked)}
                      className="mr-2"
                    />
                    Top Light
                  </label>
                  {configuration.topLightDoor && (
                    <input
                      type="number"
                      placeholder="Height in mm"
                      value={configuration.topLightDoorHeight}
                      onChange={(e) => updateConfiguration('topLightDoorHeight', parseInt(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  )}
                </div>
              </div>
            )}

            {configuration.windowType === 'sliding-door' && (
              <div>
                <label className="block text-sm font-medium mb-2">Sliding Direction</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => updateConfiguration('slidingDirection', 'left')}
                    className={`p-4 border-2 rounded-lg ${
                      configuration.slidingDirection === 'left'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Left Sliding
                  </button>
                  <button
                    onClick={() => updateConfiguration('slidingDirection', 'right')}
                    className={`p-4 border-2 rounded-lg ${
                      configuration.slidingDirection === 'right'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Right Sliding
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Window Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Width (mm)</label>
                <input
                  type="number"
                  min="500"
                  max="3000"
                  value={configuration.dimensions.width}
                  onChange={(e) => updateConfiguration('dimensions', {
                    ...configuration.dimensions,
                    width: parseInt(e.target.value)
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Height (mm) {(configuration.windowType === 'balcony-door' || configuration.windowType === 'entrance-door') && '(min. 1800mm)'}
                </label>
                <input
                  type="number"
                  min={(configuration.windowType === 'balcony-door' || configuration.windowType === 'entrance-door') ? 1800 : 500}
                  max="3000"
                  value={configuration.dimensions.height}
                  onChange={(e) => updateConfiguration('dimensions', {
                    ...configuration.dimensions,
                    height: parseInt(e.target.value)
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {configuration.windowType === 'double-sash' && (
              <div>
                <h4 className="text-lg font-medium mb-3">Sash Configuration</h4>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sashConfig"
                        value="symmetrical"
                        checked={configuration.sashConfig === 'symmetrical'}
                        className="mr-2"
                        onChange={(e) => updateConfiguration('sashConfig', e.target.value)}
                      />
                      Symmetrical (50/50 split)
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="sashConfig"
                        value="asymmetrical"
                        checked={configuration.sashConfig === 'asymmetrical'}
                        className="mr-2"
                        onChange={(e) => updateConfiguration('sashConfig', e.target.value)}
                      />
                      Asymmetrical
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Glass Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {config.glassTypes.map(glass => (
                  <button
                    key={glass.id}
                    onClick={() => updateConfiguration('glassType', glass.id)}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      configuration.glassType === glass.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {glass.name}
                    <div className="text-xs text-gray-500 mt-1">{glass.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3">Interior Color</h4>
                <div className="grid grid-cols-2 gap-3">
                  {config.colors.map(color => (
                    <button
                      key={`interior-${color.id}`}
                      onClick={() => updateConfiguration('interiorColor', color.id)}
                      className={`p-3 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                        configuration.interiorColor === color.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3">Exterior Color</h4>
                <div className="grid grid-cols-2 gap-3">
                  {config.colors.map(color => (
                    <button
                      key={`exterior-${color.id}`}
                      onClick={() => updateConfiguration('exteriorColor', color.id)}
                      className={`p-3 border-2 rounded-lg flex items-center space-x-3 transition-colors ${
                        configuration.exteriorColor === color.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Roller Shutter</h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={configuration.rollerShutter}
                    onChange={(e) => updateConfiguration('rollerShutter', e.target.checked)}
                    className="mr-3 w-5 h-5"
                  />
                  Add Roller Shutter
                </label>

                {configuration.rollerShutter && (
                  <div className="ml-8 space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Shutter Type</label>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={configuration.rollerShutterType}
                        onChange={(e) => updateConfiguration('rollerShutterType', e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="top-mounted">Top-mounted</option>
                        <option value="built-in">Built-in</option>
                        <option value="surface-mounted">Surface-mounted</option>
                      </select>
                    </div>
                    
                    {configuration.rollerShutterType && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Control Type</label>
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          value={configuration.rollerShutterControl}
                          onChange={(e) => updateConfiguration('rollerShutterControl', e.target.value)}
                        >
                          <option value="">Select Control</option>
                          {configuration.rollerShutterType === 'surface-mounted' ? (
                            <>
                              <option value="electric-switch">Electric with Switch</option>
                              <option value="electric-remote">Electric with Remote Control</option>
                            </>
                          ) : (
                            <>
                              <option value="manual">Manual</option>
                              <option value="electric-switch">Electric with Switch</option>
                              <option value="electric-remote">Electric with Remote Control</option>
                            </>
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Locking Options</h3>
              <div className="space-y-3">
                {config.lockingOptions.map(option => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      name="lockingOption"
                      value={option.id}
                      checked={configuration.lockingOption === option.id}
                      onChange={(e) => updateConfiguration('lockingOption', e.target.value)}
                      className="mr-3"
                    />
                    {option.name}
                    <span className="text-sm text-gray-500 ml-2">({option.description})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Review & Submit Order</h3>
            
            {isAuthenticated ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="text-green-800 font-semibold mb-2">✓ Logged in as:</h4>
                <div className="text-green-700 text-sm">
                  <p><strong>Name:</strong> {userData?.name}</p>
                  <p><strong>Email:</strong> {userData?.email}</p>
                  <p><strong>Phone:</strong> {userData?.phone}</p>
                  <p><strong>Address:</strong> {userData?.address}</p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-blue-800 font-semibold mb-2">Authentication Required</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Please login or create an account to submit your order request.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Login / Register
                </button>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Configuration Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Manufacturer:</strong> {configuration.manufacturer || 'Not selected'}</div>
                <div><strong>Material:</strong> {configuration.material?.toUpperCase() || 'Not selected'}</div>
                <div><strong>Window Type:</strong> {configuration.windowType || 'Not selected'}</div>
                <div><strong>Dimensions:</strong> {configuration.dimensions.width} × {configuration.dimensions.height} mm</div>
                <div><strong>Glass Type:</strong> {configuration.glassType || 'Not selected'}</div>
                <div><strong>Interior Color:</strong> {configuration.interiorColor || 'Not selected'}</div>
                <div><strong>Exterior Color:</strong> {configuration.exteriorColor || 'Not selected'}</div>
                <div><strong>Roller Shutter:</strong> {configuration.rollerShutter ? 'Yes' : 'No'}</div>
                <div><strong>Locking:</strong> {configuration.lockingOption || 'Not selected'}</div>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              disabled={submitting}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Order...
                </div>
              ) : (
                isAuthenticated ? 'Submit Order Request' : 'Login & Submit Order'
              )}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Window Configurator</h1>
          <p className="text-sm sm:text-base text-gray-600">Customize your perfect window</p>
          
          {/* Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <div className="hidden sm:flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-xs sm:text-sm font-medium ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            
            {/* Mobile step indicator */}
            <div className="sm:hidden mb-2 text-center">
              <span className="text-sm font-medium text-blue-600">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {renderStepContent()}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                  Previous
                </button>

                {currentStep < steps.length - 1 && (
                  <button
                    onClick={nextStep}
                    className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Visualization & Pricing Panel */}
          <div className="space-y-4 sm:space-y-6">
            {/* Preview Toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-center px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              {showPreview ? <EyeOff className="w-4 h-4 mr-1 sm:mr-2" /> : <Eye className="w-4 h-4 mr-1 sm:mr-2" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            {/* Window Visualization */}
            {showPreview && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Window Preview</h3>
                <WindowVisualization configuration={configuration} />
              </div>
            )}

            {/* Pricing Panel */}
            <PricingPanel configuration={configuration} config={config} />
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default WindowConfigurator;