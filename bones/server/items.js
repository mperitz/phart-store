'use strict'

const db = require('APP/db')
const Item = db.model('items')
const Comment = db.model('comment')
const router = require('express').Router();

router.get('/', function(req, res, next) {
//working
  Item.findAll()
  .then(allItems => {
    res.json(allItems)
  })
  .catch(next)
})

router.get('/:Itemid', function(req, res, next){
	Item.findById(req.params.Itemid)
	.then(item => res.json(item))
	.catch(next)
})

router.get('/:Itemid/comments', function(req, res, next) {
  Comment.findAll({
    include: {all: true},
    where: {item_id: req.params.Itemid}
  })
  .then(commentsArr => {
    res.json(commentsArr)
  })
  .catch(next)
})


module.exports = router
