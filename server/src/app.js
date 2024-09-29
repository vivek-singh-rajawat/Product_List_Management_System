// app.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const { errorHandler } = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();


app.use(cors(
 { origin: ['http://localhost:3000']}
));
app.use(express.json());
app.use('/api/products', productRoutes);   // Define the base route for products
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
