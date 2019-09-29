'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserTypes', [
      {
        name: 'Intercambista'
      },
      {
        name: 'Funcionário'
      },
      {
        name: 'Administrador'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserTypes', null, {})
  }
}
