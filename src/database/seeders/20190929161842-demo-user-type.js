'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Intercambista', 'Funcionário', 'Administrador']
    const data = []

    for (let i = 0; i < names.length; i++) {
      data.push({ id: i + 1, name: names[i] })
    }

    return queryInterface.bulkInsert('UserTypes', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('UserTypes', null, {})
  }
}
