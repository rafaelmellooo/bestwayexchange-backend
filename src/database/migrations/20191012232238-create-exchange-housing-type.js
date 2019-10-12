'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ExchangeHousingTypes', {
      exchangeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'exchanges',
          key: 'id'
        }
      },
      housingTypeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'housingtypes',
          key: 'id'
        }
      }
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('ExchangeHousingTypes')
  }
}
