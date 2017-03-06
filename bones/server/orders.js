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

// THIS DOESNT WOOORRRRRRKKKKKKKKKKK!!!!!!!!
/*
We want to find the correct Order (based on user id)
and then eager load in all the extra data.
The findAll works, but using include just returns
an empty object.  We know this from simply going
through the browser and writing in the api url.
*/
router.get('/cart/:userId', function(req, res, next){
// get a specific order by ID
  console.log('The user id is: ', req.params.userId)
	Order.findAll({
    include: [
      {
        model: User,
        where: { id: req.params.userId }
      },
      {
        model: OrderItem
      }
    ]
  })
	.then(enhancedOrder => res.json(enhancedOrder))
	.catch(next)
})

router.post('/cart', function(req, res, next) {
  Order.findOrCreate({
    where: {
      status: 'In Cart'
    }
  })
})

module.exports = router
