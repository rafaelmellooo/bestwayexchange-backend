'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(8)
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING
      },
      neighborhood: {
        allowNull: false,
        type: Sequelize.STRING
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      complement: {
        type: Sequelize.STRING
      },
      agencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'agencies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('addresses')
  }
}
