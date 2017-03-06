'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = db.model('users')
const Order = db.model('orders')
const OrderItem = db.model('orderItems')
const Item = db.model('items')


const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/', forbidden('only admins can list users'), (req, res, next) =>
    User.findAll()
    .then(users => res.json(users))
    .catch(next))
  .post('/', (req, res, next) =>
    User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next))
  .get('/:id', mustBeLoggedIn, (req, res, next) =>
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next))
  .get('/:userId/orderHistory', function(req, res, next) {
    if(req.user){
    Order.findAll({
      where: {
        status:{
          $ne: 'In Cart'
        }
      },
    include: [
      {
        model: User,
        where: { id: req.user.dataValues.id }
      },
      {
        model: OrderItem,
        include: [ { model: Item } ]
      }
    ]
  })
    .then(orders => res.json(orders))
    .catch(next)
  }
  })
  
