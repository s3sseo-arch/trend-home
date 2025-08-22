const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/window-configurator', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Models
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const ConfigurationSchema = new mongoose.Schema({
  manufacturers: [{
    id: String,
    name: String,
    materials: [String],
    basePrice: Number,
    description: String
  }],
  materials: [{
    id: String,
    name: String,
    price: Number,
    color: String,
    description: String
  }],
  windowTypes: [{
    id: String,
    name: String,
    price: Number,
    description: String,
    minHeight: Number,
    maxHeight: Number
  }],
  glassTypes: [{
    id: String,
    name: String,
    price: Number,
    description: String
  }],
  colors: [{
    id: String,
    name: String,
    color: String,
    price: Number,
    category: String
  }],
  openingTypes: [{
    id: String,
    name: String,
    price: Number,
    description: String
  }],
  rollerShutterTypes: [{
    id: String,
    name: String,
    price: Number,
    description: String
  }],
  lockingOptions: [{
    id: String,
    name: String,
    price: Number,
    description: String
  }],
  updatedAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  configuration: {
    manufacturer: String,
    material: String,
    windowType: String,
    dimensions: {
      width: Number,
      height: Number
    },
    glassType: String,
    interiorColor: String,
    exteriorColor: String,
    rollerShutter: Boolean,
    rollerShutterType: String,
    rollerShutterControl: String,
    lockingOption: String,
    leftOpening: String,
    rightOpening: String,
    topLight: Boolean,
    bottomLight: Boolean,
    sideLight: {
      left: Boolean,
      right: Boolean,
      leftWidth: Number,
      rightWidth: Number
    },
    topLightDoor: Boolean,
    doorType: String,
    slidingDirection: String,
    additionalOptions: [String]
  },
  pricing: {
    basePrice: Number,
    additionalCosts: Number,
    totalPrice: Number,
    breakdown: [{
      item: String,
      price: Number
    }]
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'read', 'replied', 'closed'], 
    default: 'new' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', AdminSchema);
const Configuration = mongoose.model('Configuration', ConfigurationSchema);
const Order = mongoose.model('Order', OrderSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const User = mongoose.model('User', UserSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Middleware for Admin Authentication
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Initialize Default Admin and Configuration
const initializeDefaults = async () => {
  try {
    // Create default admin if doesn't exist
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const defaultAdmin = new Admin({
        username: 'admin',
        email: 'admin@trendhome-fenster.de',
        password: hashedPassword
      });
      await defaultAdmin.save();
      console.log('Default admin created: username: admin, password: admin123');
    }

    // Create default configuration if doesn't exist
    const configExists = await Configuration.findOne();
    if (!configExists) {
      const defaultConfig = new Configuration({
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
      await defaultConfig.save();
      console.log('Default configuration created');
    }
  } catch (error) {
    console.error('Error initializing defaults:', error);
  }
};

// Routes

// Admin Authentication Routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Configuration Routes
app.get('/api/configuration', async (req, res) => {
  try {
    const config = await Configuration.findOne().sort({ updatedAt: -1 });
    console.log('API: Sending configuration:', config ? 'Found' : 'Not found');
    res.json(config || {});
  } catch (error) {
    console.error('API: Error getting configuration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/configuration', authenticateAdmin, async (req, res) => {
  try {
    console.log('API: Updating configuration with:', req.body);
    const config = await Configuration.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    console.log('API: Configuration updated successfully');
    res.json(config);
  } catch (error) {
    console.error('API: Error updating configuration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Contact Routes
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    // Send notification email to admin
    await sendContactNotificationEmail(contact);
    
    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/contacts', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/contacts/:id', authenticateAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/api/contacts/:id', authenticateAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Order Routes
app.post('/api/orders', async (req, res) => {
  try {
    const orderNumber = `WIN-${Date.now()}`;
    const order = new Order({
      ...req.body,
      orderNumber
    });

    await order.save();

    // Send emails
    await sendOrderEmails(order);

    res.json({
      success: true,
      orderNumber,
      message: 'Order submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/api/orders/:id', authenticateAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Dashboard Stats
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const processingOrders = await Order.countDocuments({ status: 'processing' });
    const completedOrders = await Order.countDocuments({ status: 'completed' });
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customerInfo.name status createdAt pricing.totalPrice');
      
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt');

    res.json({
      totalOrders,
      pendingOrders,
      processingOrders,
      completedOrders,
      totalContacts,
      newContacts,
      recentOrders,
      recentContacts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Email sending function
const sendOrderEmails = async (order) => {
  try {
    // Generate PDF content
    const pdfContent = generateOrderPDF(order);
    
    // Admin email
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'aviaryan9708@gmail.com',
      subject: `New Window Order Request - ${order.customerInfo.name}`,
      html: `
        <h2>New Window Order Received</h2>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        
        <h3>Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${order.customerInfo.name}</li>
          <li><strong>Email:</strong> ${order.customerInfo.email}</li>
          <li><strong>Phone:</strong> ${order.customerInfo.phone}</li>
          <li><strong>Address:</strong> ${order.customerInfo.address}</li>
        </ul>
        
        <h3>Configuration Details:</h3>
        <ul>
          <li><strong>Manufacturer:</strong> ${order.configuration.manufacturer}</li>
          <li><strong>Material:</strong> ${order.configuration.material}</li>
          <li><strong>Window Type:</strong> ${order.configuration.windowType}</li>
          <li><strong>Dimensions:</strong> ${order.configuration.dimensions.width} × ${order.configuration.dimensions.height} mm</li>
          <li><strong>Glass Type:</strong> ${order.configuration.glassType}</li>
          <li><strong>Interior Color:</strong> ${order.configuration.interiorColor}</li>
          <li><strong>Exterior Color:</strong> ${order.configuration.exteriorColor}</li>
          <li><strong>Total Price:</strong> €${order.pricing.totalPrice}</li>
        </ul>
        
        <p>Please review this order in the admin panel.</p>
      `,
      attachments: [{
        filename: `Order-${order.orderNumber}.pdf`,
        content: pdfContent,
        contentType: 'application/pdf'
      }]
    };

    // Customer email
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: order.customerInfo.email,
      subject: 'Order Confirmation - TrendHome Fenster',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Dear ${order.customerInfo.name},</p>
        
        <p>We have received your window configuration request and will process it shortly.</p>
        
        <h3>Order Details:</h3>
        <ul>
          <li><strong>Order Number:</strong> ${order.orderNumber}</li>
          <li><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</li>
          <li><strong>Estimated Price:</strong> €${order.pricing.totalPrice}</li>
        </ul>
        
        <h3>Configuration Summary:</h3>
        <ul>
          <li><strong>Manufacturer:</strong> ${order.configuration.manufacturer}</li>
          <li><strong>Material:</strong> ${order.configuration.material}</li>
          <li><strong>Window Type:</strong> ${order.configuration.windowType}</li>
          <li><strong>Dimensions:</strong> ${order.configuration.dimensions.width} × ${order.configuration.dimensions.height} mm</li>
        </ul>
        
        <p>Our team will contact you within 24 hours with a detailed quote and next steps.</p>
        
        <p>If you have any questions, please contact us:</p>
        <ul>
          <li><strong>Phone:</strong> +49 (0) 179 74 25361</li>
          <li><strong>Email:</strong> aviaryan9708@gmail.com</li>
        </ul>
        
        <p>Thank you for choosing TrendHome Fenster!</p>
        
        <p>Best regards,<br>TrendHome Fenster Team</p>
      `,
      attachments: [{
        filename: `Order-${order.orderNumber}.pdf`,
        content: pdfContent,
        contentType: 'application/pdf'
      }]
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);
    
    console.log('Order emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

// Contact notification email
const sendContactNotificationEmail = async (contact) => {
  try {
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'aviaryan9708@gmail.com',
      subject: `New Contact Form Submission - ${contact.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Date:</strong> ${new Date(contact.createdAt).toLocaleDateString()}</p>
        
        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${contact.name}</li>
          <li><strong>Email:</strong> ${contact.email}</li>
          <li><strong>Phone:</strong> ${contact.phone}</li>
          <li><strong>Subject:</strong> ${contact.subject}</li>
        </ul>
        
        <h3>Message:</h3>
        <p>${contact.message}</p>
        
        <p>Please respond to this inquiry through the admin panel.</p>
      `
    };

    await transporter.sendMail(adminMailOptions);
    console.log('Contact notification email sent successfully');
  } catch (error) {
    console.error('Error sending contact notification email:', error);
  }
};

// Generate PDF content for orders
const generateOrderPDF = (order) => {
  // Simple PDF content generation (you can enhance this with a proper PDF library)
  const pdfContent = `
ORDER CONFIRMATION
==================

Order Number: ${order.orderNumber}
Date: ${new Date(order.createdAt).toLocaleDateString()}

CUSTOMER INFORMATION:
Name: ${order.customerInfo.name}
Email: ${order.customerInfo.email}
Phone: ${order.customerInfo.phone}
Address: ${order.customerInfo.address}

CONFIGURATION DETAILS:
Manufacturer: ${order.configuration.manufacturer}
Material: ${order.configuration.material}
Window Type: ${order.configuration.windowType}
Dimensions: ${order.configuration.dimensions.width} × ${order.configuration.dimensions.height} mm
Glass Type: ${order.configuration.glassType}
Interior Color: ${order.configuration.interiorColor}
Exterior Color: ${order.configuration.exteriorColor}
Roller Shutter: ${order.configuration.rollerShutter ? 'Yes' : 'No'}

PRICING:
Total Price: €${order.pricing.totalPrice}

Thank you for choosing TrendHome Fenster!
  `;
  
  return Buffer.from(pdfContent, 'utf8');
};
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDefaults();
});

module.exports = app;