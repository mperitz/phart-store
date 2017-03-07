'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const Sequelize = require('sequelize')
const db = require('APP/db')
const User = require('./user')
const OAuth = require('./oauth')
const Item = require('./item')
const Comment = require('./comment')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Band = require('./band')
const Genre = require('./genre')

OAuth.belongsTo(User)
User.hasOne(OAuth)

Item.belongsTo(User, {as: 'seller'})

//puts a user id on the order (can have multiple orders)
Order.belongsTo(User)
Order.belongsToMany(User, {through: 'order-user'})
User.belongsToMany(Order, {through: 'order-user'})

//puts order id on OrderItem (order can have many orderItems)
Order.hasMany(OrderItem)
Item.hasMany(OrderItem)

//puts item id on orderItem (there can be many orderItems for the same item)
OrderItem.belongsToMany(Item, {through: 'OrderItem-item'})
Item.belongsToMany(OrderItem, {through: 'OrderItem-item'})

//genre id on band and item
Item.belongsTo(Genre)
Band.belongsTo(Genre)

//places bandId on item
Item.belongsTo(Band)

// places Item_id on comment
Comment.belongsTo(Item)
Comment.belongsTo(User)


module.exports = {User, Item, Comment, Band, Order, OrderItem, Genre}
