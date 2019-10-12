'use strict'

module.exports = {
  up: queryInterface => {
    const data = []

    for (let i = 0; i < 30; i++) {
      const exchangeId = i + 1
      for (let j = 0; j < 4; j++) {
        const userId = j + 1
        for (let k = 0; k < 3; k++) {
          const itemId = k + 1

          data.push({
            exchangeId,
            userId,
            itemId,
            gradeId: Math.floor((Math.random() * 5) + 1)
          })
        }
      }
    }

    return queryInterface.bulkInsert('ItemRates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ItemRates', null, {})
  }
}
