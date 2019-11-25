'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Péssimo', 'Ruim', 'Razoável', 'Bom', 'Excelente']
    const data = []
    let id = 0

    names.map(name => {
      id++
      data.push({ id, name })
    })

    return queryInterface.bulkInsert('grades', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('grades', null, {})
  }
}
