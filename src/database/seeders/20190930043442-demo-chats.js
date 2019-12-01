'use strict'

module.exports = {
  up: queryInterface => {
    const { addSeconds, getMonth, setDate } = require('date-fns')

    const agencies = []

    const tmp = {
      employee: 0,
      exchange: 0
    }

    for (let i = 0; i < 10; i++) {
      const employees = []
      const exchanges = []

      for (let j = 0; j < 4; j++) {
        tmp.employee++
        employees.push(tmp.employee)
      }

      for (let j = 0; j < 10; j++) {
        tmp.exchange++
        exchanges.push(tmp.exchange)
      }

      agencies.push({
        employees,
        exchanges
      })
    }

    const data = []

    let id = 0

    const today = new Date()
    let createdAt = setDate(today, getMonth(today) - 1)

    for (let i = 0; i < 120; i++) {
      if (i % 5 !== 0) { continue }

      for (let j = 0; j < 10; j++) {
        if (j % 5 !== 0) { continue }

        const agency = agencies[j]

        const employees = {
          0: agency.employees[1],
          4: agency.employees[2],
          8: agency.employees[3]
        }

        for (let k = 0; k < 10; k++) {
          if (k % 4 !== 0) { continue }

          const exchangeId = agency.exchanges[k]

          const employeeId = employees[k]

          createdAt = addSeconds(createdAt, 1)
          id++

          data.push({
            id,
            userId: i + 41,
            employeeId,
            createdAt,
            exchangeId
          })
        }
      }
    }

    return queryInterface.bulkInsert('chats', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('chats', null, {})
  }
}
