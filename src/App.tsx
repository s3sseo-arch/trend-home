import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiService from './services/api.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ShopPage from './components/ShopPage';
import Homepage from './components/Homepage';
import WindowConfigurator from './components/WindowConfigurator';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';
import About from './components/About';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [configuratorConfig, setConfiguratorConfig] = React.useState(null);
  const [adminData, setAdminData] = React.useState(null);

  const handleConfigUpdate = (config: any) => {
    setConfiguratorConfig(config);
    console.log('Config updated in App:', config);
  };

  const handleAdminLogin = (admin: any) => {
    setAdminData(admin);
  };

  const handleAdminLogout = () => {
    setAdminData(null);
    localStorage.removeItem('token');
  };
  
  // Load initial configuration
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      try {
        const configData = await ApiService.getConfiguration();
        if (configData && Object.keys(configData).length > 0) {
          setConfiguratorConfig(configData);
        }
      } catch (error) {
        console.error('Error loading initial configuration:', error);
      }
    };
    
    loadInitialConfig();
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          adminData ? (
            <AdminDashboard adminData={adminData} onLogout={handleAdminLogout} />
          ) : (
            <AdminLogin onLoginSuccess={handleAdminLogin} />
          )
        } />
        <Route path="/*" element={
          <>
            <Navbar />
            <div className="min-h-screen bg-gray-100">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/window-configurator" element={<WindowConfigurator config={configuratorConfig} />} />
                <Route path="/kontakt" element={<ContactForm />} />
              </Routes>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;


