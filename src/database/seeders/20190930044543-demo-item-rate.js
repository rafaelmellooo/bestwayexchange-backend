'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const itemRates = []

    for (let i = 0; i < 320; i++) {
      let rateId = Math.floor((Math.random() * 160) + 1)
      let itemId = Math.floor((Math.random() * 3) + 1)

      while (
        itemRates.some(([_rateId, _itemId]) => _rateId === rateId && _itemId === itemId)
      ) {
        rateId = Math.floor((Math.random() * 160) + 1)
        itemId = Math.floor((Math.random() * 3) + 1)
      }

      itemRates.push([
        rateId, itemId
      ])

      data.push({
        rateId,
        itemId,
        gradeId: Math.floor((Math.random() * 5) + 1)
      })
    }

    return queryInterface.bulkInsert('ItemRates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ItemRates', null, {})
  }
}
