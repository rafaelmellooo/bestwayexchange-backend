'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      filename: {
        type: Sequelize.STRING
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('countries')
  }
}
