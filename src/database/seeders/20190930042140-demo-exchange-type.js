'use strict'

module.exports = {
  up: queryInterface => {
    const exchangetypes = [
      [
        'Estudo de Idiomas',
        'Essa modalidade de intercâmbio tem como objetivo o aprendizado de uma nova língua. Tanto pode ser feia por pessoas que têm um nível inicial na língua estrangeira quanto por pessoas que já possuem um nível mais avançados e desejam evoluir ainda mais.'
      ],
      [
        'Au Pair',
        'Cuidar de crianças, ser pago por isso e se manter nos Estados Unidos com o que recebe da família contratante é o objetivo de quem deseja fazer intercâmbio do tipo Au Pair. Com esse tipo de programa é possível passar cerca de uma ano nos Estados Unidos. Além da remuneração, a família contratante ainda paga um curso para a babá.'
      ],
      [
        'Graduação',
        'O estudante pode tanto cursar a graduação inteira em instituições estrangeiras quanto um semestre ou período específico.'
      ],
      [
        'Especialização profissional',
        'É possível fazer uma especialização profissional fora do país, como um mestrado, doutorado ou algum curso que ofereça capacitação específica para um aspecto da área de conhecimento estudada.'
      ],
      [
        'Work and Travel',
        'Estudar e trabalhar também é um dos tipos de intercâmbio possíveis. Nesse caso, não necessariamente a viagem estará vinculada à uma instituição de ensino. A pessoa irá para outro país através de programas de trabalho que trarão mais experiência para o currículo, aprendizado da língua estrangeira e nova vivências interpessoais.'
      ],
      [
        'Voluntariado',
        'O voluntariado é considerado uma das formas mais generosas de intercâmbio. Nessa modalidade a pessoa viajar para trabalhar voluntariamente em uma ONG ou outro tipo de organização que realiza trabalhos sociais. A partir das vivências vem o aprendizado, assim como no Work and travel, a melhora nas habilidades de fala e compreensão da língua é desenvolvida através do contato com outras pessoas.'
      ]
    ]
    const data = []

    for (let i = 0; i < exchangetypes.length; i++) {
      const [name, description] = exchangetypes[i]
      data.push({ id: i + 1, name, description })
    }

    return queryInterface.bulkInsert('ExchangeTypes', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('ExchangeTypes', null, {})
  }
}
