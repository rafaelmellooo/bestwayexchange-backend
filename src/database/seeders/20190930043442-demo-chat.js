'use strict'

module.exports = {
  up: function (queryInterface) {
    const faker = require('faker')

    const agencies = []

    const id = {
      employee: 0,
      exchange: 0
    }

    for (let i = 0; i < 10; i++) {
      const employees = []
      const exchanges = []

      for (let j = 0; j < 4; j++) {
        id.employee++
        if (j === 0) { continue }
        employees.push(id.employee)
      }

      for (let j = 0; j < 20; j++) {
        id.exchange++
        exchanges.push(id.exchange)
      }

      agencies.push({
        employees,
        exchanges
      })
    }

    const data = []

    const createdAt = new Date()
    createdAt.setMonth(createdAt.getMonth() - 1)

    const createMessage = (exchangeId, from, to, isVisualized = true) => {
      createdAt.setMinutes(createdAt.getMinutes() + 1)

      data.push({
        message: faker.lorem.paragraph(),
        from,
        to,
        createdAt,
        isVisualized,
        exchangeId
      })
    }

    for (let i = 0; i < 120; i++) {
      if (i % 4 === 0) { continue }

      for (let j = 0; j < 3; j++) {
        const agency = agencies[Math.floor(Math.random() * 10)]

        for (let k = 0; k < 5; k++) {
          const employeeId = agency.employees[Math.floor(Math.random() * 3)]
          const exchangeId = agency.exchanges[Math.floor(Math.random() * 20)]

          for (let l = 0; l < 10; l++) {
            if (l % 2 === 0) {
              const from = i + 41
              const to = employeeId

              createMessage(exchangeId, from, to)
            } else {
              const from = employeeId
              const to = i + 41

              if (i % 3 === 0 && l === 9) { createMessage(exchangeId, from, to, false) } else { createMessage(exchangeId, from, to) }
            }
          }
        }
      }
    }

    console.log(data[0], data[1])
    return queryInterface.bulkInsert('Chats', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Chats', null, {})
  }
}
