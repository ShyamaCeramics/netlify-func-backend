const express = require('express');
const Sequelize = require("sequelize");
const cors = require('cors');
const serverless = require('serverless-http');

const adminRoutes = require('../routes/adminRoutes');
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(express.static('routes'));

let sequelize = new Sequelize({
  host: "mysql8010.site4now.net",
  database: "db_aa9fb2_sha",
  username: "aa9fb2_sha",
  password: "Fake@123456",
  dialect: "mysql",
  dialectModule: require('mysql2')
});

// DB Connection test
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();

app.use('/.netlify/functions/api/product', productRoutes);
app.use('/.netlify/functions/api/order', orderRoutes);
app.use('/.netlify/functions/api/admin', adminRoutes);
app.use('/.netlify/functions/api/user', userRoutes);

module.exports.handler = serverless(app);
