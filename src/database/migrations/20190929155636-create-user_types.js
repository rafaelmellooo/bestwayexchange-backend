'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_types')
  }
}
