'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AgencyGrades', {
      agencyId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'agencies',
          key: 'id'
        }
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      gradeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'grades',
          key: 'id'
        }
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