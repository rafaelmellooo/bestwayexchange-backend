'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      expiresIn: {
        type: Sequelize.DATE
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usertypes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      agencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'agencies',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      filename: {
        type: Sequelize.STRING
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('Users')
  }
}
