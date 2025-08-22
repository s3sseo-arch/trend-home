import React, { useState, useEffect } from 'react';
import { Calculator, Edit3 } from 'lucide-react';

interface PricingPanelProps {
  configuration: any;
  config?: any;
}

const PricingPanel: React.FC<PricingPanelProps> = ({ configuration, config }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  // Default pricing structure
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
      'tilt-turn': 40
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

  // Use config prices if available, otherwise use defaults
  const getPrice = (category: string, id: string, fallback: number = 0) => {
    if (config && config[category]) {
      const item = config[category].find((item: any) => item.id === id);
      return item ? (item.price || item.basePrice || 0) : fallback;
    }
    return defaultBasePrices[category as keyof typeof defaultBasePrices]?.[id as keyof any] || fallback;
  };

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
    
    // Window type addon
    if (configuration.windowType) {
      price += getPrice('windowTypes', configuration.windowType, 0);
    }
    
    // Glass type addon
    if (configuration.glassType) {
      price += getPrice('glassTypes', configuration.glassType, 0);
    }
    
    // Color addons
    if (configuration.interiorColor) {
      price += getPrice('colors', configuration.interiorColor, 0);
    }
    if (configuration.exteriorColor && configuration.exteriorColor !== configuration.interiorColor) {
      price += getPrice('colors', configuration.exteriorColor, 0);
    }
    
    // Opening type addons
    if (configuration.leftOpening && configuration.leftOpening !== 'fixed') {
      price += getPrice('openingTypes', configuration.leftOpening, 20);
    }
    if (configuration.rightOpening && configuration.rightOpening !== 'fixed') {
      price += getPrice('openingTypes', configuration.rightOpening, 20);
    }
    
    // Additional features
    if (configuration.rollerShutter) {
      price += getPrice('rollerShutterTypes', configuration.rollerShutterType, 150);
      if (configuration.rollerShutterControl && configuration.rollerShutterControl.includes('electric')) {
        price += 100; // Electric control addon
      }
    }
    
    if (configuration.lockingOption) {
      price += getPrice('lockingOptions', configuration.lockingOption, 0);
    }
    
    // Lights and side panels
    if (configuration.topLight) price += 80;
    if (configuration.bottomLight) price += 80;
    if (configuration.topLightDoor) price += 100;
    if (configuration.sideLight?.left) price += 120;
    if (configuration.sideLight?.right) price += 120;
    
    // Size multiplier (per square meter)
    const area = (configuration.dimensions.width * configuration.dimensions.height) / 1000000; // Convert to m²
    price *= Math.max(area, 0.5); // Minimum 0.5m² charge
    
    return Math.round(price * 100) / 100;
  };

  useEffect(() => {
    setTotalPrice(calculatePrice());
  }, [configuration]);

  const getPriceBreakdown = () => {
    const breakdown = [];
    
    if (configuration.manufacturer) {
      breakdown.push({
        label: 'Base Price',
        value: getPrice('manufacturers', configuration.manufacturer, 150)
      });
    }
    
    if (configuration.material) {
      const materialPrice = getPrice('materials', configuration.material, 0);
      if (materialPrice > 0) {
        breakdown.push({ label: 'Material', value: materialPrice });
      }
    }
    
    if (configuration.windowType) {
      const windowTypePrice = getPrice('windowTypes', configuration.windowType, 0);
      if (windowTypePrice > 0) {
        breakdown.push({ label: 'Window Type', value: windowTypePrice });
      }
    }
    
    if (configuration.glassType) {
      const glassPrice = getPrice('glassTypes', configuration.glassType, 0);
      if (glassPrice !== 0) {
        breakdown.push({ label: 'Glass Type', value: glassPrice });
      }
    }
    
    const colorPrice = getPrice('colors', configuration.interiorColor, 0) + 
                     (configuration.exteriorColor !== configuration.interiorColor ? getPrice('colors', configuration.exteriorColor, 0) : 0);
    if (colorPrice > 0) {
      breakdown.push({ label: 'Colors', value: colorPrice });
    }
    
    if (configuration.rollerShutter) {
      let shutterPrice = getPrice('rollerShutterTypes', configuration.rollerShutterType, 150);
      if (configuration.rollerShutterControl && configuration.rollerShutterControl.includes('electric')) {
        shutterPrice += 100;
      }
      breakdown.push({ label: 'Roller Shutter', value: shutterPrice });
    }
    
    const lockingPrice = getPrice('lockingOptions', configuration.lockingOption, 0);
    if (lockingPrice > 0) {
      breakdown.push({ label: 'Locking Option', value: lockingPrice });
    }
    
    return breakdown;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Price Estimate
        </h3>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">
            €{totalPrice.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            Estimated price (excluding VAT)
          </div>
        </div>

        <button
          onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
          className="w-full text-left text-blue-600 hover:text-blue-700 text-sm"
        >
          {showPriceBreakdown ? 'Hide' : 'Show'} price breakdown
        </button>

        {showPriceBreakdown && (
          <div className="border-t pt-4 space-y-2">
            {getPriceBreakdown().map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">€{item.value}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Size multiplier</span>
                <span className="font-medium">
                  {((configuration.dimensions.width * configuration.dimensions.height) / 1000000).toFixed(2)}m²
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> This is an estimated price. Final pricing may vary based on specific requirements, installation complexity, and current market conditions.
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Prices updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PricingPanel;