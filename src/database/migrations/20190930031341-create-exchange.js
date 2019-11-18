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
          model: 'exchangetypes',
          key: 'id'
        }
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'countryId'
        },
        onDelete: 'SET NULL'
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      agencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'agencies',
          key: 'id'
        }
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
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Exchanges')
  }
}
