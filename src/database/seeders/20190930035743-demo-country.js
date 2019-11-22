'use strict'

module.exports = {
  up: queryInterface => {
    const countries = [
      {
        name: 'Suíça',
        description: `
          Suíça (em alemão:  [die] Schweiz [ˈʃvaɪts]; em suíço-alemão:
          Schwyz ou Schwiiz [ˈʃʋit͡s]; em francês:  Suisse [sɥis(ə)]; e
          m italiano:  Svizzera [ˈzvittsera]; em romanche:  Svizra [ˈʒviːtsrɐ] ou [ˈʒviːtsʁːɐ]), oficialmente Confederação Suíça (em alemão: Schweizerische Eidgenossenschaft; em francês: Confédération suisse; em italiano: Confederazione Svizzera; em romanche: Confederaziun svizra), é uma república federal composta por 26 estados, chamados de cantões, com a cidade de Berna como a sede das autoridades federais.  O país está situado na
          Europa Central, onde faz fronteira com a Alemanha a Norte, com a França a Oeste, com Itália a Sul e com a Áustria e o principado de Liechtenstein a Leste.  Entre elas estão as duas cidades globais e centros económicos de Zurique e Genebra.
        `,
        filename: 'Suíça-1574404044419.jpg'
      },
      {
        name: 'Brasil',
        description: `
          Brasil (localmente /bɾaˈziw/), oficialmente República Federativa do Brasil (. escutar), é o maior país da América do Sul e da região da América Latina, sendo o quinto maior do mundo em área territorial (equivalente a 47,3% do território sul-americano) e quinto em população (com mais de 210 milhões de habitantes). O território que atualmente forma o Brasil foi encontrado pelos espanhóis em 26 de janeiro de 1500, durante uma
          expedição comandada por Vicente Yáñez Pinzón, e achado pelos
          portugueses no dia 22 de abril do mesmo ano, em expedição liderada por Pedro Álvares Cabral.
        `,
        filename: 'Brasil-1574404044423.jpg'
      },
      {
        name: 'Finlândia',
        description: `
          Finlândia (em finlandês: . Suomi , pronunciado: [suomi]; em sueco: .  Cerca de 5,3 milhões de pessoas vivem na Finlândia,
          sendo que a maior parte da população está  concentrada no sul do país.
        `,
        filename: 'Finlândia-1574404044426.jpg'
      },
      {
        name: 'Canadá',
        description: `
          O Canadá (em inglês:  Canada, pronunciado [ˈkænədə] (escutar
          ); em francês:  Canada, pronunciado: [kanada]) é um país que
          ocupa grande parte da América do Norte e se estende desde o oceano Atlântico, a leste, até o oceano Pacífico, a oeste.  É
          o segundo maior país do mundo em área total, superado apenas
          pela Rússia, e a sua fronteira comum com os Estados Unidos, no sul e no noroeste, é a mais longa fronteira terrestre do mundo.  Em 1867, com a união de três colônias britânicas da América do Norte em uma confederação, o Canadá foi formado como
          um domínio federal de quatro províncias.
        `,
        filename: 'Canadá-1574404044429.jpg'
      },
      {
        name: 'Nova Zelândia',
        description: `
          Nova Zelândia (em inglês:  New Zealand, pronunciado: [ˈnjuː ˈziː. l(ə)nd]; em maori: Aotearoa, pronunciado: [aɔˈtɛaɾɔa]) é um país insular, oficialmente pertencente à Oceania, no sudoeste do Oceano Pacífico, formado por duas massas de terra principais (comumente chamadas de Ilha do Norte e Ilha do Sul) e por numerosas ilhas menores, sendo as mais notáveis as ilhas Stewart e Chatham.  O nome indígena na língua maori para a Nova Zelândia é Aotearoa, normalmente traduzido como "A Terra
          da Grande Nuvem Branca".
        `,
        filename: 'Nova Zelândia-1574404044430.jpg'
      },
      {
        name: 'Austrália',
        description: `
          Austrália (em inglês: Australia, pronunciado: [ɒˈstreɪliə, ə-], coloquialmente: [-jə]), oficialmente Comunidade da Austrália (em inglês: Commonwealth of Australia), é um país do hemisfério sul, localizado na Oceania, que compreende a menor área continental do mundo ("continente australiano"), a ilha da Tasmânia e várias ilhas adjacentes nos oceanos Índico e Pacífico.  O continente-ilha, como a Austrália por vezes é chamada, é banhado pelo oceano Índico, ao sul, e a oeste pelo mar de
          Timor, mar de Arafura e Estreito de Torres, a norte, e pelo mar de Coral e mar da Tasmânia, a leste.  Após visitas esporádicas de pescadores do norte e pela descoberta europeia por parte de exploradores holandeses em 1606, a metade oriental da
          Austrália foi reivindicada pelos britânicos em 1770 e inicialmente colonizada por meio do transporte de presos para a colônia de Nova Gales do Sul, fundada em 26 de janeiro de 1788.
        `,
        filename: 'Austrália-1574404044431.jpg'
      },
      {
        name: 'Suécia',
        description: `
          A Suécia (em sueco: Sverige; pronúncia: své-rié; IPA [ˈsværjɛ:]), oficialmente Reino da Suécia, é um país nórdico, localizado na península Escandinava na Europa do Norte.  Tem fronteiras terrestres com a Noruega, a oeste, e com a Finlândia, a nordeste, sendo banhada pelo Mar Báltico a leste e a sul. Com
          uma área terrestre de 407 311 km², um comprimento de 1 572 km e uma largura de 499 km, a Suécia é o terceiro maior país da União Europeia em termos de superfície.
        `,
        filename: 'Suécia-1574404244212.jpg'
      },
      {
        name: 'Noruega',
        description: `
          A Noruega (em bokmål: . Norge pronunciado: [noɾɡə]; em nynorsk: . Noreg), oficialmente Reino da Noruega (em bokmål: Kongeriket Norge, em nynorsk: Kongeriket Noreg), é um país nórdico
          da Europa setentrional que ocupa a parte ocidental da Península Escandinava, a ilha de Jan Mayen e o arquipélago ártico de Esvalbarda, através do Tratado de Esvalbarda.
        `,
        filename: 'Noruega-1574404244213.jpg'
      },
      {
        name: 'Dinamarca',
        description: `
          Dinamarca (em dinamarquês: Danmark, [ˈd̥ænmɑɡ̊]), oficialment
          e Reino da Dinamarca, é um país nórdico da Europa setentrional e membro sênior do Reino da Dinamarca.  É o mais meridional dos países nórdicos, a sudoeste da Suécia e ao sul da Noruega, delimitado no sul pela Alemanha.  As demais fronteiras da
          Dinamarca são marítimas, ao norte e leste com o Mar Báltico e ao oeste com o Mar do Norte.
        `,
        filename: 'Dinamarca-1574404244214.jpg'
      },
      {
        name: 'Holanda',
        description: `
          Os Países Baixos (em neerlandês: Nederland AFI: [ˈneːdərˌlɑnt] (escutar ), literalmente "país baixo"), também conhecidos como Holanda (ver abaixo), são uma nação constituinte do Reino dos Países Baixos localizada na Europa ocidental.  O país é
          uma monarquia constitucional parlamentar democrática banhada
          pelo mar do Norte a norte e a oeste, que faz fronteira com a
          Bélgica a sul e com a Alemanha a leste.  O país possui uma das economias capitalistas mais livres do mundo — 13ª posição entre 180 países de acordo com o Índice de Liberdade Econômica em 2019.
        `,
        filename: 'Holanda-1574404244215.jpg'
      }
    ]

    const data = []

    let id = 0

    countries.map(({ name, description, filename }) => {
      id++
      data.push({
        id,
        name,
        description,
        filename
      })
    })

    return queryInterface.bulkInsert('Countries', data, {})
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Countries', null, {})
  }
}
