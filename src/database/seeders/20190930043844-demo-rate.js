'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 90; i++) {
      data.push({
        id: i + 1,
        exchangeId: Math.floor((Math.random() * 30) + 1),
        userId: Math.floor((Math.random() * 20) + 1),
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
