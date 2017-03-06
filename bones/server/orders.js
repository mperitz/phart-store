'use strict'

const db = require('APP/db')
const Item = db.model('items')
const User = db.model('users')
const Order = db.model('orders')
const OrderToUser = db.model('order-user')
const OrderItem = db.model('orderItems')
const OrderItemToItem = db.model('OrderItem-item')

const router = require('express').Router();

router.get('/', function(req, res, next) {
// get all orders (for admin use)
  Order.findAll()
  .then(allOrders => {
    res.json(allOrders)
  })
  .catch(next)
})

router.get('/:orderId', function(req, res, next){
// get a specific order by order ID
	Order.findById(req.params.orderId)
	.then(order => res.json(order))
	.catch(next)
})

router.get('/cart/:userId', function(req, res, next){
// get a specific order by ID
	Order.findAll({
    include: [
      {
        model: User,
        where: { id: req.params.userId }
      },
      {
        model: OrderItem,
        include: [ { model: Item } ]
      }
    ]
  })
	.then(enhancedOrder => {
    res.json(enhancedOrder)
  })
	.catch(next)
})

router.post('/cart/:userId', function(req, res, next) {
  return Order.findOrCreate({
    where: { status: 'In Cart' },
    include: [
      {
        model: User,
        where: { id: req.params.userId }
      }
    ]
  })
  .then(order => {
    return OrderItem.create({
        quantity: req.body.quantity,
        price: req.body.item.price,
        order_id: order[0].id,
        item_id: req.body.item.id

    })
  })
  .then(createdItem => {
    return OrderItemToItem.create({
      order_item_id: createdItem.id,
      item_id: req.body.item.id
    })
  })
  .catch(next)
})

router.put('/cart/:userId', function(req, res, next) {
  Order.findOrCreate({
    where: { status: 'In Cart' },
    include: [
      {
        model: User,
        where: { id: req.params.userId }
      }
    ]
  })
  .then(order => {
    return OrderItem.destroy({
      where: {
        order_id: order[0].id,
        item_id: req.body.item.item_id
      }
    })
  })
  .then(result => {
    res.json(result)
  })
  .catch(next)
})

module.exports = router
