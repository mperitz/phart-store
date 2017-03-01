'use strict'

const db = require('APP/db')
const Comment = require('./comment')
const {expect} = require('chai')

describe('Comment Model', () => {
  before('wait for the db', () => db.didSync)

  let longEnoughText = 'oops I pharted is my fav piece!'
  let numOfStars = 5

  let comment
  beforeEach(function(){
    comment = Comment.build({
      content: longEnoughText,
      num_stars: numOfStars
    })
  })


  describe('validations', () => {
    it('does not allow for content to have less than 10 charactors', () => {
      let tooShortText = 'short'
      comment.content = tooShortText
      return comment.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('Validation error')
      })
    })

    it("num_stars is a integer between 1-5", () => {
      let tooManyStars = 6
      comment.num_stars = tooManyStars
      return comment.validate()
      .then(function (result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('Validation error')
      })

    })

  })

  describe('instanceMethods', () => {

    it('isUpdated method resolves false for a newly created comment', () => {

      return comment.save()
      .then(newComment => {
        let result = newComment.isUpdated()
        expect(result).to.be.equal(false)
      })

    })

    it('isUpdated method returns the last updated date', () => {

    return comment.save()
    .then(newComment => {
      return newComment.update({content: 'changing my comment'})
      })
      .then(updatedComment => {
        let changeUpdateTime = 'Wed Mar 01 2017 12:32:47 GMT-0500 (EST) clearly I changed this'
        updatedComment.setDataValue('updated_at', changeUpdateTime)
        let result = updatedComment.isUpdated()
        let updated = updatedComment.getDataValue('updated_at').toString()
        expect(result).to.be.equal(changeUpdateTime)
      })

  })


  })

})



