'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const OrderItem = db.define('orderItems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  //saved in cents
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem;
