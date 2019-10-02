'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ItemRates', {
      itemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id'
        }
      },
      rateId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'rates',
          key: 'id'
        }
      },
      gradeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grades',
          key: 'id'
        }
      }
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('ItemRates')
  }
}
