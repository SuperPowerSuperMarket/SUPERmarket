const Sequelize = require('sequelize');
const db = require('../db');
const OrderQuantity = require('./order-quantity')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active'
  },
  orderedOn: {
    type: Sequelize.DATE,
  },
  shippedOn: {
    type: Sequelize.DATE,
  },
  arrivedOn: {
    type: Sequelize.DATE,
  },
  sessionId: {
    type: Sequelize.INTEGER
  }
});

Order.beforeDestroy(order => {
  OrderQuantity.destroy({
    where: {orderId: order.id}
  })
})
module.exports = Order;

