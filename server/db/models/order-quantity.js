const Sequelize = require('sequelize');
const db = require('../db');

const OrderQuantity = db.define('order-quantity', {
  quantity: {
    type: Sequelize.INTEGER,
  }
});

module.exports = OrderQuantity;
