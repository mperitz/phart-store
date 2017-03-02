'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('In Cart', 'Processing', 'Dispatched', 'Complete', 'Closed'),
    allowNull: false,
    defaultValue: 'In Cart'
    /*
    All statuses: In Cart, Processing, Dispatched, Complete, Closed
    */
  }
})

module.exports = Order;
