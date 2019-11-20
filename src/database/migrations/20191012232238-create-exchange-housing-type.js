'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExchangeHousingTypes', {
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
      housingTypeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'HousingTypes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('ExchangeHousingTypes')
  }
}
