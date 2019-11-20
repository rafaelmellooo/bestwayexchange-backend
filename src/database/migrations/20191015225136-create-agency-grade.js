'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AgencyGrades', {
      agencyId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Agencies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      gradeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Grades',
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
    return queryInterface.dropTable('AgencyGrades')
  }
}
