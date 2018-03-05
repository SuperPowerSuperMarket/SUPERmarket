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
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    subTotal() {
      if (this.superpowers) {
          
      return this.superpowers.reduce((total, power) => {
        total += power.price * power['order-quantity'].quantity
        return total;
      }, 0)
    }
    }
  }
});

Order.beforeDestroy(order => {
  OrderQuantity.destroy({
    where: {orderId: order.id}
  })
})

module.exports = Order;


