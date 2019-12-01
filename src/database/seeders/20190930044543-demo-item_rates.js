'use strict'

module.exports = {
  up: queryInterface => {
    const data = []

    for (let i = 0; i < 1714; i++) {
      for (let j = 0; j < 3; j++) {
        data.push({
          rateId: i + 1,
          itemId: j + 1,
          gradeId: Math.floor((Math.random() * 5) + 1)
        })
      }
    }

    return queryInterface.bulkInsert('item_rates', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('item_rates', null, {})
  }
}
