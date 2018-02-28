const User = require('./user');
const Superpower = require('./superpowers');
const Order = require('./order');
const OrderQuantity = require('./order-quantity')

User.hasMany(Order);

Order.belongsToMany(Superpower, {through: OrderQuantity })
Superpower.belongsToMany(Order, {through: OrderQuantity })


module.exports = {
  User,
  Superpower,
  Order,
  OrderQuantity
}
