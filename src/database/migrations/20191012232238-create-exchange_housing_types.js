'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exchange_housing_types', {
      exchangeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'exchanges',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      housingTypeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'housing_types',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('exchange_housing_types')
  }
}
