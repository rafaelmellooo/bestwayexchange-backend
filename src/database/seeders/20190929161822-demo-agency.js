'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []

    const files = [
      '0e18a093eaa768c1070fa5c0895653c9-Suíça.jpg',
      '3fc1de064f0043f468d10d76d99bb03b-Brasil.jpg',
      '33bff3ad80a071d49ae8c76e4d7b1fc5-Finlândia.jpg',
      '80b318119cf7d1aed00a561ddde2f157-Canadá.jpg',
      '90cda067b29e2360e5b83ecd6de12adf-Nova Zelândia.jpg',
      '590e4a09b86ea9b99b0c7d0327fb73f2-Austrália.jpg',
      'd3cdfe8da6f664c3751e750f777677a2-Suécia.jpg',
      'e0e5b1d15b5c4d8e4c50b4d1a251aa52-Noruega.jpg',
      'e95db7e6b500ede67bb4c28fcc312f3f-Dinamarca.jpg',
      'e813e31933dee68cc28772b9d2b2cefe-Holanda.jpg'
    ]

    for (let i = 0; i < 10; i++) {
      data.push({
        id: i + 1,
        name: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        filename: faker.random.boolean() ? 'fe675e8b6d25b1d5d195c82817647a6a-agency.png' : null,
        background: files[i]
      })
    }

    return queryInterface.bulkInsert('Agencies', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Agencies', null, {})
  }
}
