const User = require('./user');
const Superpower = require('./superpowers');
const Order = require('./order');
const Review = require('./review')
const OrderQuantity = require('./order-quantity')

User.hasMany(Order);

Order.belongsToMany(Superpower, {through: OrderQuantity })
Superpower.belongsToMany(Order, {through: OrderQuantity })

// You can also do:
//
// Order.hasMany(OrderQuantity)
// OrderQuantity.belongsTo(Order)

Review.belongsTo(User)
Review.belongsTo(Superpower)
Superpower.hasMany(Review)

module.exports = {
  User,
  Superpower,
  Order,
  OrderQuantity,
  Review
}
