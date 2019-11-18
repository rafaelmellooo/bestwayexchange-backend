'use strict'

module.exports = {
  up: function (queryInterface) {
    const faker = require('faker')

    const data = []
    let id = 0

    const create = (typeId, agencyId = undefined) => {
      id++
      data.push({
        id,
        email: faker.internet.exampleEmail(),
        name: faker.name.findName(),
        password: '$2a$10$yKB089r0SlA8tl6iXxVHb.abrHpKdCwADgzIt7J7i9dN6I2a0vzBi',
        typeId,
        agencyId,
        token: '6d9081ed2a66869ee7351495bcb4b8c760628648',
        expiresIn: '2019-10-05 00:49:52',
        isActive: true,
        dateOfBirth: '2001-07-15',
        filename: faker.random.boolean() ? '77e20b5059451811c29e4cefd825c0b9-user.png' : null
      })
    }

    for (let i = 0; i < 10; i++) {
      create(3, i + 1)
      for (let j = 0; j < 3; j++) {
        create(2, i + 1)
      }
    }

    for (let i = 0; i < 120; i++) {
      create(1)
    }

    return queryInterface.bulkInsert('Users', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
