'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const exchangeLanguages = []

    for (let i = 0; i < 975; i++) {
      let exchangeId = Math.floor((Math.random() * 150) + 1)
      let languageId = Math.floor((Math.random() * 10) + 1)

      while (
        exchangeLanguages.some(([_exchangeId, _languageId]) => _exchangeId === exchangeId && _languageId === languageId)
      ) {
        exchangeId = Math.floor((Math.random() * 150) + 1)
        languageId = Math.floor((Math.random() * 10) + 1)
      }

      exchangeLanguages.push([
        exchangeId, languageId
      ])

      data.push({
        exchangeId, languageId
      })
    }

    return queryInterface.bulkInsert('exchange_languages', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('exchange_languages', null, {})
  }
}
