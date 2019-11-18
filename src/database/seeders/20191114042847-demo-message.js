'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')
    const { addSeconds, getDate, setDate } = require('date-fns')
    const { zonedTimeToUtc } = require('date-fns-tz')

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

      for (let j = 0; j < 20; j++) {
        tmp.exchange++
        exchanges.push(tmp.exchange)
      }

      agencies.push({
        employees,
        exchanges
      })
    }

    const data = []

    const today = zonedTimeToUtc(new Date(), 'America/Sao_Paulo')
    let createdAt = setDate(today, getDate(today) - 1)

    let chatId = 0

    for (let i = 0; i < 120; i++) {
      if (i % 2 === 0) { continue }

      for (let j = 0; j < 10; j++) {
        if (j % 2 === 0) { continue }

        const agency = agencies[j]

        for (let k = 0; k < 20; k++) {
          if (k % 2 === 0) { continue }

          const employeeId = k % 2 === 0 ? agency.employees[1] : (k % 3 === 0 ? agency.employees[2] : agency.employees[3])

          chatId++

          for (let l = 0; l < 5; l++) {
            const from = l % 2 === 0 ? (i + 41) : employeeId

            const filename = l === 3 ? (faker.random.boolean() ? '4decc52ed3bf91366485508cb5cebd26-contract.pdf' : null) : (l === 4 ? (faker.random.boolean() ? '6028ee5d20e6baed985f934c3a887da3-document.png' : null) : null)

            createdAt = addSeconds(createdAt, 1)

            data.push({
              chatId,
              body: faker.lorem.paragraph(),
              from,
              isVisualized: faker.random.boolean(),
              createdAt,
              filename
            })
          }
        }
      }
    }

    return queryInterface.bulkInsert('Messages', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Messages', null, {})
  }
}
