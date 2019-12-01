'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const exchangeHousingTypes = []

    for (let i = 0; i < 345; i++) {
      let exchangeId = Math.floor((Math.random() * 100) + 1)
      let housingTypeId = Math.floor((Math.random() * 5) + 1)

      while (
        exchangeHousingTypes.some(([_exchangeId, _housingTypeId]) => _exchangeId === exchangeId && _housingTypeId === housingTypeId)
      ) {
        exchangeId = Math.floor((Math.random() * 100) + 1)
        housingTypeId = Math.floor((Math.random() * 5) + 1)
      }

      exchangeHousingTypes.push([
        exchangeId, housingTypeId
      ])

      data.push({
        exchangeId, housingTypeId
      })
    }

    return queryInterface.bulkInsert('exchange_housing_types', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('exchange_housing_types', null, {})
  }
}
