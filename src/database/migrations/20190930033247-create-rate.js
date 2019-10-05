'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exchangeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'exchanges',
          key: 'id'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('Rates')
  }
}
