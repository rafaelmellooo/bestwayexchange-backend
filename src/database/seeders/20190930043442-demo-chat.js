'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const chats = []
    const data = []
    for (let i = 0; i < 16384; i++) {
      let from = Math.floor((Math.random() * 20) + 1)
      let to = Math.floor((Math.random() * 20) + 1)
      let createdAt = faker.date.between('2018-01-01', new Date())

      while (from === to) {
        from = Math.floor((Math.random() * 20) + 1)
        to = Math.floor((Math.random() * 20) + 1)
      }

      while (
        chats.some(([_from, _to, _createdAt]) => _from === from && _to === to && _createdAt === createdAt)
      ) {
        from = Math.floor((Math.random() * 20) + 1)
        to = Math.floor((Math.random() * 20) + 1)
        createdAt = faker.date.between('2018-01-01', new Date())
      }

      chats.push([
        from, to, createdAt
      ])

      data.push({
        message: faker.lorem.paragraph(),
        from,
        to,
        createdAt,
        hasViewed: true,
        exchangeId: Math.floor((Math.random() * 30) + 1)
      })
    }

    return queryInterface.bulkInsert('Chats', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Chats', null, {})
  }
}
