'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ItemRates', {
      rateId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'rates',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      itemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      gradeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grades',
          key: 'id'
        },
        onDelete: 'SET NULL'
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('ItemRates')
  }
}
