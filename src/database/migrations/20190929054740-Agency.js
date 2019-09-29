'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Agency', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Agency')
  }
}
