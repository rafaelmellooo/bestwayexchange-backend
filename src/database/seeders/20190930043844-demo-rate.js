'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    const rates = []
    for (let i = 0; i < 160; i++) {
      let userId = Math.floor((Math.random() * 20) + 1)
      let exchangeId = Math.floor((Math.random() * 30) + 1)

      while (
        rates.some(([_userId, _exchangeId]) => _userId === userId && _exchangeId === exchangeId)
      ) {
        userId = Math.floor((Math.random() * 20) + 1)
        exchangeId = Math.floor((Math.random() * 30) + 1)
      }

      rates.push([
        userId, exchangeId
      ])

      data.push({
        id: i + 1,
        userId,
        exchangeId,
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
