'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({ id: i + 1, name: faker.company.companyName() })
    }

    return queryInterface.bulkInsert('Agencies', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Agencies', null, {})
  }
}
