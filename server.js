const path= require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();




const app = express();
// Ensure correct protocol (https) is detected behind reverse proxies/CDNs


// Serve uploaded files
// app.use('/upload', express.static(path.join(__dirname, 'uploads')));


app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo connection error",err));

// Routes

app.use('/api/about', require('./routes/about'));
app.use('/api/events', require('./routes/events'));
app.use('/api/admin', require('./routes/adminAuth'));
app.use('/api/admin-content', require('./routes/adminContent'));
app.use('/api/memories', require('./routes/memories'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/plan', require('./routes/plan'));
app.use('/api/contact', require('./routes/contact'));

app.use('/api/upload', require('./routes/upload'));
// Static file serving
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'EKAI Backend API', 
    version: '1.0.0',
    endpoints: {
      about: '/api/about',
      events: '/api/events', 
      admin: '/api/admin',
      adminContent: '/api/admin-content',
      memories: '/api/memories',
      users: '/api/users',
      uploads: '/uploads',
      health: '/health'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

