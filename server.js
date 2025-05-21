const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config(); 
const playersRoute=require('./routes/player');
const updateRoute=require('./routes/upadte');

const app = express();

app.use(express.json()); 
app.use(cors());
app.use('/api',playersRoute)
app.use('/api',updateRoute)

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port no: ${port}`);
});
