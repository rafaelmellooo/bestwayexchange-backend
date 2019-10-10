'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const itemRates = []

    for (let i = 0; i < 180; i++) {
      let itemId = Math.floor((Math.random() * 3) + 1)
      let rateId = Math.floor((Math.random() * 90) + 1)

      while (
        itemRates.some(([item, rate]) => item === itemId && rate === rateId)
      ) {
        itemId = Math.floor((Math.random() * 3) + 1)
        rateId = Math.floor((Math.random() * 90) + 1)
      }

      itemRates.push([
        itemId, rateId
      ])

      data.push({
        itemId,
        rateId,
        gradeId: Math.floor((Math.random() * 5) + 1)
      })
    }

    return queryInterface.bulkInsert('ItemRates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ItemRates', null, {})
  }
}
