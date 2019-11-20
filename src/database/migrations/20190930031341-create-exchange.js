'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Exchanges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      exchangeTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ExchangeTypes',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      agencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Agencies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      filename: {
        type: Sequelize.STRING
      },
      time: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Exchanges')
  }
}
