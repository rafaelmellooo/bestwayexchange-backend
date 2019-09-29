'use strict'
const faker = require('faker')

const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    name: faker.company.companyName()
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Agencies', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Agencies', null, {})
  }
}
