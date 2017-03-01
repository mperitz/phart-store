'use-strict' // esling-disable-line semi
/* eslint-disable camelcase */

const db = require('APP/db')
const Band = require('./band')
const { expect } = require('chai')

describe('Band model', () => {

  beforeEach('sync force true', (done) => {
    Band.sync({ force: true })
    .then(function() { done() })
    .catch(done)
  })

  let creatingBand1

  beforeEach('create some instances', () => {

    creatingBand1 = Band.build({
      name: 'Phish',
      profile_image: 'http://phish.com/wp-content/themes/phish/assets/img/phFB.jpg',
      image_references: ['url1.com', 'url2.com', 'url3.com'],
      description: 'We are king of jam bands.  Bow before us.',
      genre: 'Jam'
    })

  })

  it(' should exist', () => {
    return creatingBand1.save()
    .then(() => {
      expect(Band).to.be.an('object')
    })

  })

  describe('name', () => {

    it('cannot be null', () => {
      creatingBand1.name = null
      return creatingBand1.validate()
      .then(result => {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('name cannot be null')
      })
    })

  })

  describe.only('favorite_users', () => {

    it('has a default empty array value', () => {
      return creatingBand1.save()
       .then(() => {
         expect(creatingBand1.favorite_users).to.deep.equal([])
       })
    })

  })

})
