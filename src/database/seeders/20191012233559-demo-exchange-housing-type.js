'use strict'

module.exports = {
  up: queryInterface => {
    const data = []

    for (let i = 0; i < 30; i++) {
      const exchangeId = i + 1
      for (let j = 0; j < 5; j++) {
        const housingTypeId = j + 1

        data.push({
          exchangeId, housingTypeId
        })
      }
    }

    return queryInterface.bulkInsert('ExchangeHousingTypes', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ExchangeHousingTypes', null, {})
  }
}
