'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      chatId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'chats',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      from: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      body: {
        type: Sequelize.TEXT('long')
      },
      isVisualized: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      filename: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages')
  }
}
