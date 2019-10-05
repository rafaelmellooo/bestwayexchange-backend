'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chats', {
      message: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      exchangeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'exchanges',
          key: 'id'
        }
      },
      hasViewed: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      from: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      to: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chats')
  }
}
