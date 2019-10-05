'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const rates = []
    const data = []
    for (let i = 0; i < 90; i++) {
      let exchangeId = Math.floor((Math.random() * 30) + 1)
      let userId = Math.floor((Math.random() * 20) + 1)

      while (
        rates.some(([_exchangeId, _userId]) => _exchangeId === exchangeId && _userId === userId)
      ) {
        exchangeId = Math.floor((Math.random() * 30) + 1)
        userId = Math.floor((Math.random() * 20) + 1)
      }

      rates.push([
        exchangeId, userId
      ])

      data.push({
        id: i + 1,
        exchangeId,
        userId,
        description: faker.lorem.paragraph(),
        createdAt: new Date()
      })
    }

    return queryInterface.bulkInsert('Rates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Rates', null, {})
  }
}
