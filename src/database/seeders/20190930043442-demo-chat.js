'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const data = []
    for (let i = 0; i < 240; i++) {
      const sender = Math.floor((Math.random() * 20) + 1)
      let receiver = Math.floor((Math.random() * 20) + 1)

      while (sender === receiver) {
        receiver = Math.floor((Math.random() * 20) + 1)
      }

      data.push({
        message: faker.lorem.paragraph(),
        sender,
        receiver,
        createdAt: new Date(),
        hasViewed: 1,
        exchangeId: Math.floor((Math.random() * 30) + 1)
      })
    }

    return queryInterface.bulkInsert('Chats', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Chats', null, {})
  }
}
