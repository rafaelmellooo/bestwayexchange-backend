'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Qualidade no Atendimento', 'Experiência do Intercâmbio', 'Relação de custo-benefício']
    const data = []

    for (let i = 0; i < names.length; i++) {
      data.push({ id: i + 1, name: names[i] })
    }

    return queryInterface.bulkInsert('Items', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Items', null, {})
  }
}
