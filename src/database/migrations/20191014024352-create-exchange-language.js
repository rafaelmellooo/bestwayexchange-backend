'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExchangeLanguages', {
      exchangeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Exchanges',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      languageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Languages',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('ExchangeLanguages')
  }
}
