'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      agencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'agencies',
          key: 'id'
        }
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2)
      }
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('Addresses')
  }
}
