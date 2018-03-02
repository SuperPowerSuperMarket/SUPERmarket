const Sequelize = require('sequelize');
const db = require('../db');
const Superpower = require('./superpowers');

const OrderQuantity = db.define('order-quantity', {
  quantity: {
    type: Sequelize.INTEGER,
  }
}, {
  getterMethods: {
    itemPrice() {
        return Superpower.findById(this.superpowerId)
        .then(superpower => this.quantity * +superpower.price)
    }
  }
});

module.exports = OrderQuantity;
