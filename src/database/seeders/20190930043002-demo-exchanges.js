'use strict'

module.exports = {
  up: queryInterface => {
    const faker = require('faker')

    const filenames = [
      'business-team-meeting-boardroom-1574651793463.jpg',
      'businessman-uses-calculator-1574651882606.jpg',
      'coding-on-laptop-1574651882124.jpg',
      'contact-us-flatlay-1574651882125.jpg',
      'contact-us-lettering-1574651830151.jpg',
      'macbook-air-on-desk-1574651793464.jpg',
      'office-team-business-meeting-1574651830554.jpg',
      'office-woman-hands-on-report-1574651882126.jpg',
      'planning-design-being-creative-1574651931997.jpg',
      'row-of-young-adults-at-work-1574651882605.jpg',
      'startup-desktop-1574651830149.jpg',
      'students-working-on-project-1574651830150.jpg',
      'study-group-1574651882607.jpg',
      'tablet-coffee-1574651793465.jpg',
      'taking-notes-and-working-on-laptop-1574651830556.jpg',
      'three-women-in-office-1574651830555.jpg',
      'university-study-group-1574651793467.jpg',
      'wrtiting-tools-1574651793466.jpg',
      null
    ]

    const data = []
    let id = 0

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        id++
        data.push({
          id,
          description: faker.lorem.paragraph(),
          name: faker.commerce.productName(),
          exchangeTypeId: Math.floor((Math.random() * 6) + 1),
          cityId: Math.floor((Math.random() * 100) + 1),
          agencyId: i + 1,
          price: faker.commerce.price(),
          createdAt: new Date(),
          filename: filenames[Math.floor(Math.random() * filenames.length)],
          time: Math.floor((Math.random() * 12) + 1)
        })
      }
    }

    return queryInterface.bulkInsert('exchanges', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('exchanges', null, {})
  }
}
