'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Intercambista', 'Funcionário', 'Administrador']
    const data = []
    let id = 0

    names.map(name => {
      id++
      data.push({ id, name })
    })

    return queryInterface.bulkInsert('user_types', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('user_types', null, {})
  }
}
