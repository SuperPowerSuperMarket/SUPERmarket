const Sequelize = require('sequelize');
const db = require('../db');
const Superpower = require('./superpowers');

const OrderQuantity = db.define('order-quantity', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  // totalPrice: {
  //   type: Sequelize.VIRTUAL,
  //   get () {
  //     return Superpower.findById(this.superpowerId)
  //   }
  // }
}, 
// {
//   getterMethods: {
//     totalPrice: function() {
//       const quantity = this.quantity

//       return Superpower.findById(this.superpowerId)
//       .then(superpower => superpower.dataValues.price * quantity)

//     //   // console.log({superpower})
//     //   const price = superpower.dataValues.price
//     //   // console.log({quantity})
//     //   console.log({price, quantity})
//     //   return price * quantity
//     }
//   }
// }
);

module.exports = OrderQuantity;
