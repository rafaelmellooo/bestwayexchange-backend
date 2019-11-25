'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const favorites = []

    for (let i = 0; i < 1920; i++) {
      let exchangeId = Math.floor((Math.random() * 150) + 1)
      let userId = Math.floor((Math.random() * 120) + 41)

      while (
        favorites.some(([_exchangeId, _userId]) => _exchangeId === exchangeId && _userId === userId)
      ) {
        exchangeId = Math.floor((Math.random() * 150) + 1)
        userId = Math.floor((Math.random() * 120) + 41)
      }

      favorites.push([
        exchangeId, userId
      ])

      data.push({
        exchangeId,
        userId,
        createdAt: new Date()
      })
    }

    return queryInterface.bulkInsert('favorites', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('favorites', null, {})
  }
}
