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
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      exchangeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exchanges',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      comment: {
        type: Sequelize.TEXT('long')
      },
      isRated: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Rates')
  }
}
