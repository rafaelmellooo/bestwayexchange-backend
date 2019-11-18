'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    let id = 0

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        id++
        data.push({
          id,
          description: faker.lorem.paragraph(),
          name: faker.commerce.productName(),
          exchangeTypeId: Math.floor((Math.random() * 6) + 1),
          cityId: Math.floor((Math.random() * 60) + 1),
          agencyId: i + 1,
          price: faker.commerce.price(),
          createdAt: new Date(),
          filename: faker.random.boolean() ? '031e51eacb9e3ee20e12df1f79659ccd-exchange.png' : null
        })
      }
    }

    return queryInterface.bulkInsert('Exchanges', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Exchanges', null, {})
  }
}
