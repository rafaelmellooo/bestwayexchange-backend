'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 30; i++) {
      const exchangeId = i + 1
      for (let j = 0; j < 4; j++) {
        const userId = j + 1

        data.push({
          userId,
          exchangeId,
          description: faker.lorem.paragraph(),
          createdAt: new Date()
        })
      }
    }

    return queryInterface.bulkInsert('Rates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Rates', null, {})
  }
}
