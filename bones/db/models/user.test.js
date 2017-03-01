'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = require('./user')
const {expect} = require('chai')

describe('User oAuth', () => {
  before('wait for the db', () => db.didSync)


  describe('authenticate(plaintext: String) ~> Boolean', () => {

    it('resolves true if the password matches', () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  })



})

describe('User', () => {
  let user1, user2

  beforeEach('add user samples', () => {
    user1 = User.build({
      username: 'correctUser',
      email: 'phish@fish.com',
      is_vendor: true,
      is_admin: true,
      endorsed_by: [21, 4, 3, 7, 'fish'],
      favorite_users: [1, 2, 4],
      favorite_bands: [2, 8]
    })

    user2 = User.build({
      username: 'correctUserwertyuiopasdfgghj',
      favorite_bands: [2, 'garbagedata']
    })
  })

  describe('username ---', () => {


      // creatingItem1.description = 'Wow!'
      // return creatingItem1.validate()
      // .then(result => {
      //   expect(result).to.be.an.instanceOf(Error)
      //   expect(result.message).to.contain('content of comments must be at least 10 characters')
      // })



    it('resolves true if under 25 characters', () => {
      return user1.validate()
      .then((result) => {
        expect(result).to.not.be.an.instanceOf(Error)
      })
    })

    it('resolves false if greater that 25 characters', () => {
      return user2.validate()
      .then((result) => {
        expect(result).to.be.an.instanceOf(Error)
        // expect(result.message).to.contain()
      })
    })
  })


  describe('isVendor ---', () => {

    it('resolves true if set to true', () => {
      return user1.validate()
      .then(() => {
        expect(user1.is_vendor).to.be.equal(true)
      })
    })

    it('resolves false if not set', () => {
      return user2.validate()
      .then(() => {
        expect(user2.is_vendor).to.be.equal(false)
      })
    })
  })

  describe('isAdmin ---', () => {

    it('resolves true if set to true', () => {
      return user1.validate()
      .then(() => {
        expect(user1.is_vendor).to.be.equal(true)
      })
    })

    it('resolves false if not set', () => {
      return user2.validate()
      .then(() => {
        expect(user2.is_vendor).to.be.equal(false)
      })
    })
  })

  describe('endorsedBy ---', () => {

    it('resolves true if contains integers', () => {
      return user1.save()
      .catch((result) => {
        console.log(result)
        expect(result).to.be.an.instanceOf(Error)
      })
    })

    it('sets to empty array if not set', () => {
      return user2.validate()
      .then(() => {
        expect(user2.endorsed_by).to.deep.equal([])
      })
    })
  })

  describe.only('favorites ---', () => {

    describe('manual validation for users and bands', () => {

      it('resolves true if under 3 and false if over', () => {
        return user1.validate()
        .then(() => {
          expect(user1.favorite_users.length).to.be.below(4)
          expect(user1.favorite_bands.length).to.be.below(4)
        })
      })

      it('sets to empty array if not set', () => {
        return user2.validate()
        .then(() => {
          expect(user2.favorite_users).to.deep.equal([])
        })
      })
    })

    // describe('updateFavorites instance method', () => {

    //   it('changes the favorite users', () => {

    //   })

    //   it('changes the favorite bands', () => {

    //   })

    //   it('does not update if input is not valid', () => {

    //   })
    // })
  })
})
