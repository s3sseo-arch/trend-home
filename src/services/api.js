const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async adminLogin(credentials) {
    const response = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async userLogin(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async userRegister(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success) {
      this.setToken(response.token);
    }
    
    return response;
  }

  logout() {
    this.setToken(null);
  }

  // Configuration
  async getConfiguration() {
    try {
      const config = await this.request('/configuration');
      console.log('API: Configuration loaded:', config);
      return config;
    } catch (error) {
      console.error('Error loading configuration:', error);
      // Return default configuration if API is not available
      return {
        manufacturers: [
          { id: 1, name: 'Premium Windows', description: 'High-quality German engineering', price: 0 }
        ],
        materials: [
          { id: 1, name: 'uPVC', description: 'Durable and energy-efficient', price: 0 }
        ],
        windowTypes: [
          { id: 1, name: 'Casement', description: 'Side-hinged window', price: 100 }
        ],
        glassTypes: [
          { id: 1, name: 'Double Glazed', description: 'Energy efficient double glazing', price: 50 }
        ],
        colors: [
          { id: 1, name: 'White', hex: '#FFFFFF', price: 0 }
        ],
        openingTypes: [
          { id: 1, name: 'Inward Opening', description: 'Opens inward', price: 0 }
        ],
        rollerShutters: [
          { id: 1, name: 'Manual', description: 'Manual operation', price: 150 }
        ],
        lockingOptions: [
          { id: 1, name: 'Standard Lock', description: 'Basic security lock', price: 25 }
        ]
      };
    }
  }

  async updateConfiguration(config) {
    console.log('API: Updating configuration:', config);
    const result = await this.request('/configuration', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
    console.log('API: Configuration updated:', result);
    return result;
  }

  // Contact
  async submitContact(contactData) {
    return await this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getContacts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/contacts${queryString ? `?${queryString}` : ''}`);
  }

  async updateContact(id, contactData) {
    return await this.request(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async deleteContact(id) {
    return await this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async submitOrder(orderData) {
    return await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/orders${queryString ? `?${queryString}` : ''}`);
  }

  async getOrder(id) {
    return await this.request(`/orders/${id}`);
  }

  async updateOrder(id, orderData) {
    return await this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(id) {
    return await this.request(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin Dashboard
  async getAdminStats() {
    return await this.request('/admin/stats');
  }
}

export default new ApiService();