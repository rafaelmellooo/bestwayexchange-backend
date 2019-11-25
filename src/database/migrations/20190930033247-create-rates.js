'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rates', {
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
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      exchangeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'exchanges',
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
    return queryInterface.dropTable('rates')
  }
}
