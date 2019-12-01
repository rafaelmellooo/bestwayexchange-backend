'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')
    const { addSeconds, getDate, setDate } = require('date-fns')

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

    const today = new Date()
    let createdAt = setDate(today, getDate(today) - 1)

    let chatId = 0

    const create = (body, from, filename) => {
      createdAt = addSeconds(createdAt, 1)

      data.push({
        chatId,
        body,
        from,
        isVisualized: faker.random.boolean(),
        createdAt,
        filename
      })
    }

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

          const employeeId = employees[k]

          chatId++

          for (let l = 0; l < 10; l++) {
            const from = l % 2 === 0 ? (i + 41) : employeeId

            if (faker.random.boolean()) {
              const body = faker.lorem.paragraph()
              create(body, from, null)
            } else {
              const filename = faker.random.boolean() ? 'contract-1574404044424.pdf' : 'document-1574404244210.png'
              create(null, from, filename)
            }
          }
        }
      }
    }

    return queryInterface.bulkInsert('messages', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('messages', null, {})
  }
}
