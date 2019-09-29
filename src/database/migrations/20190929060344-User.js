'use strict'

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING
      },
      expiresIn: {
        allowNull: false,
        type: DataTypes.DATE
      },
      dateOfBirth: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'UserType',
          key: 'id'
        }
      },
      agency: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Agency',
          key: 'id'
        }
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('User')
  }
}
