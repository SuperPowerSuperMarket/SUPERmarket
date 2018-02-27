const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  orderedOn: {
    type: Sequelize.DATE,
  },
  shippedOn: {
    type: Sequelize.DATE,
  },
  arrivedOn: {
    type: Sequelize.DATE,
  }
});

module.exports = Order;

