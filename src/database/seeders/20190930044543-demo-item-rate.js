'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    for (let i = 0; i < 180; i++) {
      data.push({
        id: i + 1,
        itemId: Math.floor((Math.random() * 3) + 1),
        rateId: Math.floor((Math.random() * 90) + 1),
        gradeId: Math.floor((Math.random() * 5) + 1)
      })
    }

    return queryInterface.bulkInsert('ItemRates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ItemRates', null, {})
  }
}
