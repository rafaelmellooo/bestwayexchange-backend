'use strict'

module.exports = {
  up: queryInterface => {
    const data = []
    const userAgencies = []

    for (let i = 0; i < 60; i++) {
      let agencyId = Math.floor((Math.random() * 10) + 1)
      let userId = Math.floor((Math.random() * 20) + 1)

      while (
        userAgencies.some(([_agencyId, _userId]) => _agencyId === agencyId && _userId === userId)
      ) {
        agencyId = Math.floor((Math.random() * 10) + 1)
        userId = Math.floor((Math.random() * 20) + 1)
      }

      userAgencies.push([
        agencyId, userId
      ])

      data.push({
        agencyId,
        userId,
        gradeId: Math.floor((Math.random() * 5) + 1),
        createdAt: new Date()
      })
    }

    return queryInterface.bulkInsert('AgencyGrades', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('AgencyGrades', null, {})
  }
}
