import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X, Settings, Users, Package, Palette, Wrench } from 'lucide-react';

interface AdminPanelProps {
  onConfigUpdate: (config: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onConfigUpdate }) => {
  const [activeTab, setActiveTab] = useState('manufacturers');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Configuration state
  const [config, setConfig] = useState({
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
  });

  const [newItem, setNewItem] = useState<any>({});

  useEffect(() => {
    onConfigUpdate(config);
  }, [config, onConfigUpdate]);
  
  const updateConfigurationAPI = async (newConfig) => {
    try {
      console.log('Updating configuration:', newConfig);
      await ApiService.updateConfiguration(newConfig);
      console.log('Configuration updated successfully');
      onConfigUpdate(newConfig);
    } catch (error) {
      console.error('Error updating configuration:', error);
      alert('Error saving configuration. Please try again.');
    }
  };

  const tabs = [
    { id: 'manufacturers', name: 'Manufacturers', icon: Package },
    { id: 'materials', name: 'Materials', icon: Wrench },
    { id: 'windowTypes', name: 'Window Types', icon: Settings },
    { id: 'glassTypes', name: 'Glass Types', icon: Settings },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'openingTypes', name: 'Opening Types', icon: Settings },
    { id: 'rollerShutterTypes', name: 'Roller Shutters', icon: Settings },
    { id: 'lockingOptions', name: 'Locking Options', icon: Settings }
  ];

  const handleAdd = () => {
    const id = `${activeTab}_${Date.now()}`;
    const item = { ...newItem, id };
    
    const newConfig = {
      ...config,
      [activeTab]: [...config[activeTab as keyof typeof config], item]
    };
    
    setConfig(newConfig);
    updateConfigurationAPI(newConfig).then(() => {
      console.log('Item added successfully');
    }).catch((error) => {
      console.error('Error adding item:', error);
    });
    
    setNewItem({});
    setShowAddForm(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditing(true);
  };

  const handleSave = () => {
    const newConfig = {
      ...config,
      [activeTab]: config[activeTab as keyof typeof config].map((item: any) =>
        item.id === editingItem.id ? editingItem : item
      )
    };
    
    setConfig(newConfig);
    updateConfigurationAPI(newConfig).then(() => {
      console.log('Configuration saved successfully');
    }).catch((error) => {
      console.error('Error saving configuration:', error);
    });
    
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const newConfig = {
        ...config,
        [activeTab]: config[activeTab as keyof typeof config].filter((item: any) => item.id !== id)
      };
      
      setConfig(newConfig);
      updateConfigurationAPI(newConfig).then(() => {
        console.log('Item deleted successfully');
      }).catch((error) => {
        console.error('Error deleting item:', error);
      });
    }
  };

  const renderFormFields = (item: any, isNew = false) => {
    const updateItem = (field: string, value: any) => {
      if (isNew) {
        setNewItem(prev => ({ ...prev, [field]: value }));
      } else {
        setEditingItem(prev => ({ ...prev, [field]: value }));
      }
    };

    const commonFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => updateItem('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price (€)</label>
            <input
              type="number"
              value={item.price || 0}
              onChange={(e) => updateItem('price', parseFloat(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter price"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={item.description || ''}
            onChange={(e) => updateItem('description', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter description"
            rows={3}
          />
        </div>
      </>
    );

    switch (activeTab) {
      case 'manufacturers':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium mb-2">Base Price (€)</label>
              <input
                type="number"
                value={item.basePrice || 0}
                onChange={(e) => updateItem('basePrice', parseFloat(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter base price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Compatible Materials</label>
              <div className="space-y-2">
                {config.materials.map(material => (
                  <label key={material.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.materials?.includes(material.id) || false}
                      onChange={(e) => {
                        const materials = item.materials || [];
                        if (e.target.checked) {
                          updateItem('materials', [...materials, material.id]);
                        } else {
                          updateItem('materials', materials.filter((m: string) => m !== material.id));
                        }
                      }}
                      className="mr-2"
                    />
                    {material.name}
                  </label>
                ))}
              </div>
            </div>
          </>
        );

      case 'materials':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="color"
                value={item.color || '#FFFFFF'}
                onChange={(e) => updateItem('color', e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        );

      case 'colors':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium mb-2">Color Value</label>
              <input
                type="color"
                value={item.color || '#FFFFFF'}
                onChange={(e) => updateItem('color', e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        );

      case 'windowTypes':
        return (
          <>
            {commonFields}
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Height (mm)</label>
              <input
                type="number"
                value={item.minHeight || 500}
                onChange={(e) => updateItem('minHeight', parseInt(e.target.value) || 500)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter minimum height"
              />
            </div>
          </>
        );

      default:
        return commonFields;
    }
  };

  const renderTable = () => {
    const items = config[activeTab as keyof typeof config] || [];

    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price (€)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {activeTab === 'colors' || activeTab === 'materials' ? (
                        <div
                          className="w-6 h-6 rounded-full border mr-3"
                          style={{ backgroundColor: item.color }}
                        />
                      ) : null}
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{item.price || item.basePrice || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {item.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage window configurator settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsEditing(false);
                      setShowAddForm(false);
                    }}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Add Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Item</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {renderFormFields(newItem, true)}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Form */}
          {isEditing && editingItem && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Item</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {renderFormFields(editingItem)}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;