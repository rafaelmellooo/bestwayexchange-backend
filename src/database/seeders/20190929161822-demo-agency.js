'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        id: i + 1,
        name: faker.company.companyName(),
        description: faker.company.bs(),
        filename: faker.random.boolean() ? 'fe675e8b6d25b1d5d195c82817647a6a-agency.png' : null
      })
    }

    return queryInterface.bulkInsert('Agencies', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Agencies', null, {})
  }
}
