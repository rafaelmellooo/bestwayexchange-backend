'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Chinês', 'Espanhol', 'Inglês', 'Hindi', 'Árabe', 'Português', 'Bengali', 'Russo', 'Japonês', 'Punjabi/Lahnda']
    const data = []
    let id = 0

    names.map(name => {
      id++
      data.push({ id, name })
    })

    return queryInterface.bulkInsert('languages', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('languages', null, {})
  }
}
