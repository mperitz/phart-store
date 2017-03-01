'use-strict' // esling-disable-line semi
/* eslint-disable camelcase */

const db = require('APP/db')
const Item = require('./item')
const { expect } = require('chai')

describe('Item model', () => {

  beforeEach('sync force true', (done) => {
    Item.sync({ force: true })
    .then(function() { done() })
    .catch(done)
  })

  let creatingItem1

  beforeEach('create some instances', () => {

    creatingItem1 = Item.build({
      name: 'Phish Poster',
      num_available: 5,
      price: 5000.00,
      medium: 'Screen Print',
      profile_image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi08PzK2LPSAhXIKyYKHa71Ab4QjRwIBw&url=https%3A%2F%2Fwww.pinterest.com%2Fjeffreyhedge%2Fphish-concert-posters%2F&psig=AFQjCNGuZ1_kUhSIgPRB5CjK5q6_A1Zc5w&ust=1488402243063200',
      description: 'Wow phish is an awesome band, look at this sweet poster',
      tags: ['jamband, phish, print'],
      num_upvotes: 10
    })

  })

  it(' should exist', () => {
    return creatingItem1.save()
    .then(() => {
      expect(Item).to.be.an('object')
    })

  })

  describe('price', () => {

    it('cannot be null', () => {
      creatingItem1.price = null
      return creatingItem1.validate()
      .then(result => {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('price cannot be null')
      })

    })
  })

  describe('description', () => {

    it('must have length >= 10', () => {
      creatingItem1.description = 'Wow!'
      return creatingItem1.validate()
      .then(result => {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('content of comments must be at least 10 characters')
      })
    })

  })

  describe('avgRating getter method', () => {

    it('should be zero if no ratings exist', () => {
      const avgRating = creatingItem1.avgRating
      expect(avgRating).to.equal(0)
    })

    it('should equal the sum of all ratings divided by the number of ratings if ratings exist', () => {
      creatingItem1.ratings_sum = 24
      creatingItem1.num_ratings = 5
      const avgRating = creatingItem1.avgRating
      expect(avgRating).to.equal(24 / 5)
    })

  })
})
