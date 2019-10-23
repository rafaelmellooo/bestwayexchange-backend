'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker/locale/pt_BR')

    const data = []
    console.log(faker.address.zipCode())
    for (let i = 0; i < 30; i++) {
      data.push({
        id: i + 1,
        zipCode: parseInt(faker.address.zipCode()),
        street: faker.address.streetName(),
        neighborhood: faker.lorem.words(),
        number: faker.random.number(),
        complement: faker.lorem.words(),
        city: faker.address.city(),
        agencyId: Math.floor((Math.random() * 10) + 1),
        state: faker.address.state()
      })
    }

    return queryInterface.bulkInsert('Addresses', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Addresses', null, {})
  }
}
