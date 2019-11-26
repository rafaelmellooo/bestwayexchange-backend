'use strict'

module.exports = {
  up: function (queryInterface) {
    const faker = require('faker')

    const filenames = [
      '099012-1574649476777.png',
      '099013-1574649476778.png',
      '099014-1574649477074.png',
      '099015-1574649477075.png',
      '099016-1574649530252.png',
      '099017-1574649476387.png',
      '099018-1574649476388.png',
      '099019-1574649476389.png',
      '099020-1574649476776.png',
      '099021-1574649395861.png',
      '099022-1574649395862.png',
      '099023-1574649396127.png',
      '099024-1574649396128.png',
      '099025-1574649396129.png',
      '099026-1574649396452.png',
      '099027-1574649396453.png',
      '099028-1574649476386.png',
      '099029-1574649395425.png',
      '099030-1574649395426.png',
      '099031-1574649395860.png',
      '099036-1574649298478.png',
      '099037-1574649298479.png',
      '099038-1574649298480.png',
      '099039-1574649395424.png',
      '099040-1574649295152.png',
      '099041-1574649295153.png',
      '099042-1574649297466.png',
      '099043-1574649297467.png',
      '099044-1574649297468.png',
      '099045-1574649298117.png',
      '099046-1574649298118.png',
      '099047-1574649298119.png',
      '099048-1574649295150.png',
      '099049-1574649295151.png',
      null
    ]

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
        filename: filenames[Math.floor(Math.random() * filenames.length)]
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

    return queryInterface.bulkInsert('users', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
