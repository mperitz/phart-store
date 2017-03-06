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
    req.session.cart = 'Hello cart'
    console.log(req.session)
    res.json(enhancedOrder)
  })
	.catch(next)
})

router.post('/cart/:userId', function(req, res, next) {
  req.sessionCookies.cart.push(req.body)
  /* Want to add an order item when someone adds
  an item to the cart.  Do we need to find the order
  and then include the user and order items and then push the item
  to the order items?
  */
  return Order.findOne({
    where: { status: 'In Cart' },
    include: [
      {
        model: User,
        where: { id: req.params.userId }
      }
    ]
  })
  .then(response => res.json(response))
})

module.exports = router
