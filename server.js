//server
require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')

const adminAuthRoutes = require('./routes/adminAuth');
const userRoutes = require('./routes/userRoutes');



//admin
// const adminAuthRoutes=require('./routes/adminAuth');
const adminContentRoutes = require('./routes/adminContent');
const { default: mongoose } = require('mongoose');

//middleware
app.use(express.json());
app.use(cors());


//routes

app.use('/api/admin', adminAuthRoutes);
app.use('/api/about', adminContentRoutes)
app.use('/api/users', userRoutes)

//routes




//frontend routes
app.get('/', (req, res) => {
  res.send('welcome to the home page');
});
app.get('/api/services', (req, res) => {
  res.send('welcome to services page');
});
app.get('/api/contact', (req, res) => {
  res.send('welcome to the contact page');
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

//mongo
mongoose.connect(process.env.MONGO_URI, {
  
    useNewUrlParser: true,

    useUnifiedTopology:true
})
.then(()=>console.log("mongo connected"))
.catch(err=>console.error("mongo error", err));