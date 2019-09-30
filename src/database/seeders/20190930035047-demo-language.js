'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Chinês', 'Espanhol', 'Inglês', 'Hindi', 'Árabe', 'Português', 'Bengali', 'Russo', 'Japonês', 'Punjabi/Lahnda']
    const data = []

    for (let i = 0; i < names.length; i++) {
      data.push({ id: i + 1, name: names[i] })
    }

    return queryInterface.bulkInsert('Languages', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Languages', null, {})
  }
}
