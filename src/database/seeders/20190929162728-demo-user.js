'use strict'
const faker = require('faker')

const data = []
for (let i = 0; i < 20; i++) {
  const type = Math.floor((Math.random() * 3) + 1)
  const agency = type === 1 ? null : Math.floor((Math.random() * 10) + 1)

  data.push({
    email: faker.internet.email(),
    name: faker.name.findName(),
    password: '$2a$10$yKB089r0SlA8tl6iXxVHb.abrHpKdCwADgzIt7J7i9dN6I2a0vzBi',
    type,
    agency,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTY5NTUyMjIzLCJleHAiOjE1Njk2Mzg2MjN9.YcvUFK-WzI_4s2a2Q2rgCxUOBnESNyIrGRXtGzDN1YQ',
    expiresIn: '2019-09-29 13:31:04',
    dateOfBirth: '2001-07-15'
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
