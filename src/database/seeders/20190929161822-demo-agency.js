'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []

    const files = [
      'Austrália-1574404044431.jpg',
      'Brasil-1574404044423.jpg',
      'Canadá-1574404044429.jpg',
      'Dinamarca-1574404244214.jpg',
      'Finlândia-1574404044426.jpg',
      'Holanda-1574404244215.jpg',
      'Noruega-1574404244213.jpg',
      'Nova Zelândia-1574404044430.jpg',
      'Suécia-1574404244212.jpg',
      'Suíça-1574404044419.jpg'
    ]

    for (let i = 0; i < 10; i++) {
      data.push({
        id: i + 1,
        name: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        filename: faker.random.boolean() ? 'agency-1574404244216.png' : null,
        background: files[i]
      })
    }

    return queryInterface.bulkInsert('Agencies', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Agencies', null, {})
  }
}
