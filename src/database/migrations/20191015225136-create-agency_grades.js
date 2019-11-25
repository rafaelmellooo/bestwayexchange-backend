'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('agency_grades', {
      agencyId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'agencies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('agency_grades')
  }
}
