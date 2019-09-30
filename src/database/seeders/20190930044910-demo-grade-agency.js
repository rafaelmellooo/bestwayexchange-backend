'use strict'

module.exports = {
  up: queryInterface => {
    const data = []

    for (let i = 0; i < 60; i++) {
      data.push({
        id: i + 1,
        gradeId: Math.floor((Math.random() * 5) + 1),
        agencyId: Math.floor((Math.random() * 10) + 1),
        userId: Math.floor((Math.random() * 20) + 1),
        createdAt: new Date()
      })
    }

    return queryInterface.bulkInsert('GradeAgencies', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('GradeAgencies', null, {})
  }
}
