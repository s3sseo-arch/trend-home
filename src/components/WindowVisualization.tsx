import React from 'react';

interface WindowVisualizationProps {
  configuration: any;
}

const WindowVisualization: React.FC<WindowVisualizationProps> = ({ configuration }) => {
  const { dimensions, interiorColor, exteriorColor, windowType, rollerShutter, leftOpening, rightOpening, topLight, bottomLight, sideLight, topLightDoor } = configuration;
  
  const getColorHex = (colorId: string) => {
    const colors: { [key: string]: string } = {
      white: '#FFFFFF',
      brown: '#8B4513',
      anthracite: '#2F4F4F',
      'golden-oak': '#DAA520'
    };
    return colors[colorId] || '#FFFFFF';
  };

  const renderWindow = (isExterior = false) => {
    const frameColor = getColorHex(isExterior ? exteriorColor : interiorColor);
    const width = Math.min(dimensions.width / 5, 200);
    const height = Math.min(dimensions.height / 5, 240);

    return (
      <div className="relative">
        <svg width={width + 40} height={height + 80} className="border border-gray-200 rounded">
          {/* Roller Shutter */}
          {rollerShutter && (
            <rect
              x="15"
              y="10"
              width={width + 10}
              height="15"
              fill="#999"
              stroke="#666"
              strokeWidth="1"
            />
          )}

          {/* Top Light */}
          {(topLight || topLightDoor) && (
            <rect
              x="20"
              y={rollerShutter ? "30" : "20"}
              width={width}
              height="30"
              fill="rgba(173, 216, 230, 0.3)"
              stroke="#87CEEB"
              strokeWidth="1"
            />
          )}

          {/* Main Window Frame */}
          <rect
            x="20"
            y={topLight || topLightDoor ? (rollerShutter ? "65" : "55") : (rollerShutter ? "30" : "20")}
            width={width}
            height={height - (topLight || topLightDoor ? 30 : 0) - (bottomLight ? 30 : 0)}
            fill={frameColor}
            stroke="#666"
            strokeWidth="2"
          />
          
          {/* Glass Area */}
          <rect
            x="30"
            y={topLight || topLightDoor ? (rollerShutter ? "75" : "65") : (rollerShutter ? "40" : "30")}
            width={width - 20}
            height={height - 20 - (topLight || topLightDoor ? 30 : 0) - (bottomLight ? 30 : 0)}
            fill="rgba(173, 216, 230, 0.3)"
            stroke="#87CEEB"
            strokeWidth="1"
          />

          {/* Window Type Specific Elements */}
          {windowType === 'double-sash' && (
            <line
              x1={width / 2 + 20}
              y1={topLight || topLightDoor ? (rollerShutter ? "75" : "65") : (rollerShutter ? "40" : "30")}
              x2={width / 2 + 20}
              y2={height + (topLight || topLightDoor ? (rollerShutter ? "45" : "35") : (rollerShutter ? "10" : "0")) - (bottomLight ? 30 : 0)}
              stroke="#666"
              strokeWidth="2"
            />
          )}

          {/* Side Lights for Entrance Door */}
          {windowType === 'entrance-door' && sideLight.left && (
            <rect
              x="5"
              y={topLight || topLightDoor ? (rollerShutter ? "65" : "55") : (rollerShutter ? "30" : "20")}
              width="15"
              height={height - (topLight || topLightDoor ? 30 : 0) - (bottomLight ? 30 : 0)}
              fill="rgba(173, 216, 230, 0.3)"
              stroke="#87CEEB"
              strokeWidth="1"
            />
          )}

          {windowType === 'entrance-door' && sideLight.right && (
            <rect
              x={width + 20}
              y={topLight || topLightDoor ? (rollerShutter ? "65" : "55") : (rollerShutter ? "30" : "20")}
              width="15"
              height={height - (topLight || topLightDoor ? 30 : 0) - (bottomLight ? 30 : 0)}
              fill="rgba(173, 216, 230, 0.3)"
              stroke="#87CEEB"
              strokeWidth="1"
            />
          )}

          {/* Handle */}
          <circle
            cx={windowType === 'entrance-door' ? (width - 10) : (width - 10)}
            cy={height / 2 + (topLight || topLightDoor ? (rollerShutter ? "70" : "60") : (rollerShutter ? "35" : "25"))}
            r="3"
            fill="#333"
          />

          {/* Opening Direction Indicators */}
          {leftOpening && leftOpening !== 'fixed' && (
            <text 
              x="35" 
              y={height / 2 + (topLight || topLightDoor ? (rollerShutter ? "75" : "65") : (rollerShutter ? "40" : "30"))} 
              fontSize="8" 
              fill="#666"
            >
              {leftOpening.toUpperCase()}
            </text>
          )}

          {rightOpening && rightOpening !== 'fixed' && windowType === 'double-sash' && (
            <text 
              x={width / 2 + 35} 
              y={height / 2 + (topLight || topLightDoor ? (rollerShutter ? "75" : "65") : (rollerShutter ? "40" : "30"))} 
              fontSize="8" 
              fill="#666"
            >
              {rightOpening.toUpperCase()}
            </text>
          )}

          {/* Bottom Light */}
          {bottomLight && (
            <rect
              x="20"
              y={height + (topLight || topLightDoor ? (rollerShutter ? "35" : "25") : (rollerShutter ? "0" : "-10"))}
              width={width}
              height="30"
              fill="rgba(173, 216, 230, 0.3)"
              stroke="#87CEEB"
              strokeWidth="1"
            />
          )}

          {/* Dimension Labels */}
          <text x={width / 2 + 20} y={height + (topLight || topLightDoor ? 65 : 45) + (bottomLight ? 30 : 0)} textAnchor="middle" fontSize="10" fill="#666">
            {dimensions.width}mm
          </text>
          <text x="5" y={height / 2 + 25} textAnchor="middle" fontSize="10" fill="#666" transform={`rotate(-90, 5, ${height / 2 + 25})`}>
            {dimensions.height}mm
          </text>
        </svg>
        
        <div className="text-xs text-center mt-2 text-gray-600">
          {isExterior ? 'Exterior View' : 'Interior View'}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {renderWindow(false)}
        {renderWindow(true)}
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        * Preview is approximate and may vary from actual product
      </div>
    </div>
  );
};

export default WindowVisualization;