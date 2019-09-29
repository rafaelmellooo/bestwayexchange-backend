'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserTypes', [
      {
        id: 1,
        name: 'Intercambista'
      },
      {
        id: 2,
        name: 'Funcionário'
      },
      {
        id: 3,
        name: 'Administrador'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserTypes', null, {})
  }
}
