'use strict'

module.exports = {
  up: queryInterface => {
    const housingTypes = [
      {
        name: 'Host Family',
        description: 'Optando pela Host Family (ou homestay, como é conhecido no exterior) o intercambista se hospedará na casa de uma família nativa. Essas famílias são escritas em um programa do governo local e são rigorosamente avaliadas e selecionadas, para atender aos padrões exigidos, requerimentos e as regras da escola. Normalmente para que o intercambista faça sua escolha, são enviadas todas as informações sobre a família.'
      },
      {
        name: 'Residência Estudantil',
        description: 'Residência Estudantil\',\'As  residências estudantis estão localizadas dentro das próprias escolas ou em prédios próximos ao local de estudo. O intercambista pode escolher entre quarto compartilhado ou individual, e as áreas comuns como banheiro, sala e cozinha são coletivas. Normalmente nesse tipo de acomodação são oferecidas algumas facilidades tais como bar, academia, lavanderia, televisão, dentre outros.'
      },
      {
        name: 'Apartamento',
        description: 'Apartamento\',\'Essa opção é um meio termo entre dormitórios universitários e Host Family.  O estudante escolhe por alugar um apartamento sozinho ou dividir o aluguel e todas as outras contas com outros estudantes. Isso dependerá do que o intercambista deseja e o que ele pode pagar. Em caso de compartilhar o apartamento, normalmente é pago o valor por um quarto, que pode ser individual ou compartilhado, e geralmente áreas como banheiro, cozinha e sala são compartilhadas. Para encontrar esses apartamentos, o intercambista pode pesquisar em imobiliárias da região ou em grupos nas redes sociais, os grupos geralmente oferecem muitas opções para compartilhar.'
      },
      {
        name: 'Hotel',
        description: 'Geralmente é fácil encontrar hotéis próximos as escolas, porém  esse tipo de acomodação são considerados mais caras e o intercambista vai viver uma vida de turista, totalmente fora do ambiente estudantil. É pago por diária e tem acesso as facilidades que o hotel oferece.'
      },
      {
        name: 'Hostel',
        description: 'O termo Hostel é muito famoso principalmente entre os mochileiros, que viajam de país á país.  Essa é uma opção parecida com hotel, mas aqui tudo é compartilhado, banheiro, cozinha e quartos (salvo exceções, com opção de quarto individual). Se hospedar em hostel pode ser uma boa escolha para quem faz curso de curta duração, ou está a procurar de outra acomodação definitiva.'
      }
    ]
    const data = []
    let id = 0

    housingTypes.map(({ name, description }) => {
      id++
      data.push({ id, name, description })
    })

    return queryInterface.bulkInsert('housing_types', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('housing_types', null, {})
  }
}
