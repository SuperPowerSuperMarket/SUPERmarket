const Sequelize = require('sequelize');
const db = require('../db');
const OrderQuantity = require('./order-quantity')

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

Order.beforeDestroy(order => {
  OrderQuantity.destroy({
    where: {orderId: order.id}
  })
})
module.exports = Order;

