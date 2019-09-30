'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 15; i++) {
      data.push({
        id: i + 1,
        name: faker.address.country(),
        description: faker.lorem.paragraph()
      })
    }

    return queryInterface.bulkInsert('Countries', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Countries', null, {})
  }
}
