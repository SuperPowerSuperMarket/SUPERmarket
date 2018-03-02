const User = require('./user');
const Superpower = require('./superpowers');
const Order = require('./order');
const Review = require('./review')
const OrderQuantity = require('./order-quantity')

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Superpower, {through: OrderQuantity })
Superpower.belongsToMany(Order, {through: OrderQuantity })


Review.belongsTo(User)
module.exports = {
  User,
  Superpower,
  Order,
  OrderQuantity,
  Review
}
