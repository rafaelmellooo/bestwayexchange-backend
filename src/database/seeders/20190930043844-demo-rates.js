'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    const rates = []
    for (let i = 0; i < 1714; i++) {
      let userId = Math.floor((Math.random() * 120) + 41)
      let exchangeId = Math.floor((Math.random() * 100) + 1)

      while (
        rates.some(([_userId, _exchangeId]) => _userId === userId && _exchangeId === exchangeId)
      ) {
        userId = Math.floor((Math.random() * 120) + 41)
        exchangeId = Math.floor((Math.random() * 100) + 1)
      }

      rates.push([
        userId, exchangeId
      ])

      const isRated = faker.random.boolean();

      data.push({
        id: i + 1,
        userId,
        exchangeId,
        comment: isRated ? faker.lorem.paragraph() : null,
        isRated,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return queryInterface.bulkInsert('rates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('rates', null, {})
  }
}
