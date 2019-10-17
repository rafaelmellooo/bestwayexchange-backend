'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 30; i++) {
      data.push({
        id: i + 1,
        description: faker.lorem.paragraph(),
        name: faker.commerce.productName(),
        exchangeTypeId: Math.floor((Math.random() * 6) + 1),
        cityId: Math.floor((Math.random() * 60) + 1),
        agencyId: Math.floor((Math.random() * 10) + 1),
        price: faker.commerce.price(),
        createdAt: new Date()
      })
    }

    return queryInterface.bulkInsert('Exchanges', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Exchanges', null, {})
  }
}
