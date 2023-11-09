const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes=require('./routes/productRoutes')

//add middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api',productRoutes);

module.exports = app;