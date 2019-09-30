'use strict'

module.exports = {
  up: queryInterface => {
    const data = []

    for (let i = 0; i < 60; i++) {
      data.push({
        exchangeId: Math.floor((Math.random() * 30) + 1),
        userId: Math.floor((Math.random() * 20) + 1),
        createdAt: new Date()
      })
    }

    return queryInterface.bulkInsert('Favorites', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Favorites', null, {})
  }
}
