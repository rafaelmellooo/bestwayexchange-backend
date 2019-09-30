'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 30; i++) {
      data.push({
        id: i + 1,
        description: faker.address.streetAddress(),
        city: faker.address.city(),
        agencyId: Math.floor((Math.random() * 10) + 1),
        state: faker.address.stateAbbr()
      })
    }

    return queryInterface.bulkInsert('Addresses', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Addresses', null, {})
  }
}
