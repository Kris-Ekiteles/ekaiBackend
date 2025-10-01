
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const path= require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo connection error",err));

// app.use('/api/about', require('./routes/about'));

app.get('/', (req, res) => {
  res.send('hello from server');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/events', require('./routes/events'))
app.use('/api/admin', require('./routes/adminAuth'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
