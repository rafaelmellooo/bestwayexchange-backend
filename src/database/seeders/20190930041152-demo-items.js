'use strict'

module.exports = {
  up: queryInterface => {
    const names = ['Qualidade no Atendimento', 'Experiência do Intercâmbio', 'Relação de custo-benefício']
    const data = []
    let id = 0

    names.map(name => {
      id++
      data.push({ id, name })
    })

    return queryInterface.bulkInsert('items', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('items', null, {})
  }
}
