'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Countries',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Cities')
  }
}
