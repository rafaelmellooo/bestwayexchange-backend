'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []

    for (let i = 0; i < 20; i++) {
      const typeId = Math.floor((Math.random() * 3) + 1)
      const agencyId = typeId === 1 ? null : Math.floor((Math.random() * 10) + 1)

      data.push({
        id: i + 1,
        email: faker.internet.exampleEmail(),
        name: faker.name.findName(),
        password: '$2a$10$yKB089r0SlA8tl6iXxVHb.abrHpKdCwADgzIt7J7i9dN6I2a0vzBi',
        typeId,
        agencyId,
        token: '6d9081ed2a66869ee7351495bcb4b8c760628648',
        expiresIn: '2019-10-05 00:49:52',
        isActive: true,
        dateOfBirth: '2001-07-15'
      })
    }

    return queryInterface.bulkInsert('Users', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
