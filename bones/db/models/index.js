'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const Sequelize = require('sequelize')
const db = require('APP/db')
const User = require('./user')
const OAuth = require('./oauth')
const Item = require('./item')
// const Comment = require('./comment')
const Band = require('./band')

OAuth.belongsTo(User)
User.hasOne(OAuth)

Item.belongsTo(User, {as: 'seller'})

// to set up join table
const Order = db.define('orders', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('In Cart', 'Processing', 'Dispatched', 'Complete', 'Closed'),
    allowNull: false,
    defaultValue: 'In Cart'
    /*
    All statuses: In Cart, Processing, Dispatched, Complete, Closed
    */
  }
})
Item.belongsToMany(User, {as: 'buyer', through: Order})
User.belongsToMany(Item, {as: 'product', through: Order})

module.exports = {User, Item, /*Comment, */Band}
