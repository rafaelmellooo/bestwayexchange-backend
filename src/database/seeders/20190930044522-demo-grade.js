'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Péssimo', 'Ruim', 'Razoável', 'Bom', 'Excelente']
    const data = []

    for (let i = 0; i < names.length; i++) {
      data.push({ id: i + 1, name: names[i] })
    }

    return queryInterface.bulkInsert('Grades', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Grades', null, {})
  }
}
