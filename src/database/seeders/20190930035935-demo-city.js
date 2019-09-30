'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 60; i++) {
      data.push({
        id: i + 1,
        name: faker.address.city(),
        countryId: Math.floor((Math.random() * 15) + 1)
      })
    }

    return queryInterface.bulkInsert('Cities', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Cities', null, {})
  }
}
