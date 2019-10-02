'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const favorites = []

    for (let i = 0; i < 60; i++) {
      let exchangeId = Math.floor((Math.random() * 30) + 1)
      let userId = Math.floor((Math.random() * 20) + 1)

      while (
        favorites.some(([exchange, user]) => exchange === exchangeId && user === userId)
      ) {
        exchangeId = Math.floor((Math.random() * 30) + 1)
        userId = Math.floor((Math.random() * 20) + 1)
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

    return queryInterface.bulkInsert('Favorites', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Favorites', null, {})
  }
}
