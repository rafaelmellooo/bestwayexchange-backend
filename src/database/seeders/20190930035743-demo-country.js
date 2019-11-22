'use strict'

module.exports = {
  up: queryInterface => {
    const countries = [
      {
        name: 'Suíça',
        description: `
          Charmosos e encantadores, os principais pontos turísticos da 
          Suíça atraem visitantes de todo o mundo, inclusive brasileiros. 
          As atrações têm características que agradam aos gostos mais 
          variados, desde Alpes e oportunidades de escalada para 
          aventureiros até belos castelos e construções repletas de 
          histórias, lendas e curiosidades.  
        `,
        filename: 'Suíça-1574404044419.jpg'
      },
      {
        name: 'Brasil',
        description: `
          O Brasil oferece aos turistas nacionais e internacionais uma 
          ampla gama de opções, sendo que as áreas naturais são o seu 
          produto turístico mais popular, uma combinação de ecoturismo 
          com lazer e recreação, principalmente sol e praia e turismo 
          de aventura, bem como o turismo histórico e cultural.
        `,
        filename: 'Brasil-1574404044423.jpg'
      },
      {
        name: 'Finlândia',
        description: `
          De país substancialmente agrícola a um dos mais desenvolvidos da 
          Europa, a Finlândia tem muito a ensinar - não só para os viajantes 
          como para o mundo todo. O país exibe alguns dos melhores 
          indicadores sociais do mundo, como renda, escolaridade e qualidade 
          de vida e já foi considerado o segundo país mais estável do globo, 
          ficando atrás apenas da Dinamarca.
        `,
        filename: 'Finlândia-1574404044426.jpg'
      },
      {
        name: 'Canadá',
        description: `
          Como não considerar fazer um intercâmbio no Canadá? Tem neve 
          e tem praia, tem Inglês e Francês, moradores hospitaleiros e 
          paisagens de cinema. Com tanta variedade e uma enorme 
          preocupação com a qualidade de vida, não é por acaso que o 
          Canadá está entre os destinos preferidos dos estudantes 
          brasileiros, que têm o privilégio de mergulhar na riqueza 
          multicultural de um país mestre em receber outros povos de 
          braços abertos.
        `,
        filename: 'Canadá-1574404044429.jpg'
      },
      {
        name: 'Nova Zelândia',
        description: `
          A viagem dura quase um dia inteiro e o fuso horário tem quinze 
          horas de diferença em relação ao Brasil. Mas nenhum sacrifício 
          é muito grande quando se trata da Nova Zelândia. Quem desembarca 
          na terra dos kiwis – o nome que os habitantes locais ganharam em 
          homenagem a um pássaro típico da região – logo fica deslumbrado 
          com o clima tropical, a hospitalidade dos moradores e a bela 
          paisagem, favorável aos esportes radicais ou apenas à contemplação.
        `,
        filename: 'Nova Zelândia-1574404044430.jpg'
      },
      {
        name: 'Austrália',
        description: `
          A Austrália é maior país da Oceania, ex-colônia britânica e 
          hoje é uma das nações mais ricas do mundo e um dos destinos 
          preferidos de quem procura o exótico com um gosto familiar. 
          Fazer um intercâmbio na Austrália é poder desfrutar de paisagens 
          inacreditáveis e raras, também praias maravilhosas, um clima 
          parecido ao nosso e peculiaridades que tornam a estada ainda 
          mais agradável. Os australianos são conhecidos pelo jeitão 
          relax e por saberem acolher o viajante, até facilitando as 
          coisas para quem vai fazer algum curso – a Austrália é um dos 
          poucos países que permitem que o estrangeiro trabalhe enquanto 
          estuda.
        `,
        filename: 'Austrália-1574404044431.jpg'
      },
      {
        name: 'Suécia',
        description: `
          O melhor da Suécia é a sua natureza e paisagens. É, por isso, 
          longe das cidades, que se concentram na metade sul do país, que 
          com mais facilidade vai tropeçar em argumentos de cortar a 
          respiração e que valem qualquer viagem. Caminhadas, ciclismo, 
          campismo, esqui e passeios de barco são das atividades mais 
          procuradas por quem vive na Suécia, assim como a pesca e a 
          “caça” aos cogumelos e bagas. 
        `,
        filename: 'Suécia-1574404244212.jpg'
      },
      {
        name: 'Noruega',
        description: `
          A Noruega possui uma extensa costa litorânea, recortada por 
          fiordes (golfos estreitos e profundos, delimitados por montanhas). 
          Essas características físicas proporcionam belas paisagens, além 
          de impulsionarem a atividade pesqueira.
        `,
        filename: 'Noruega-1574404244213.jpg'
      },
      {
        name: 'Dinamarca',
        description: `
          A Dinamarca é gigante em cultura, culinária e beleza natural. 
          Atrações como Tivoli, a Pequena Sereia e Legoland fascinam os 
          visitantes de todo o mundo há anos. Além disso, o país figura 
          no top 3 dos mais felizes do mundo nos últimos anos de acordo 
          com o Relatório Mundial da Felicidade, das Nações Unidas.
        `,
        filename: 'Dinamarca-1574404244214.jpg'
      },
      {
        name: 'Holanda',
        description: `
          Charmosa, moderna e liberal. Essa é uma das melhores 
          definições para a Holanda, que na verdade se divide em duas 
          províncias: Holanda do Norte, onde fica a capital Amsterdã, 
          e Holanda do Sul, onde se situa a sede do governo Haia. Ambas 
          fazem parte da área chamada de Países Baixos, devido à baixa 
          altitude. Cerca de um terço do território holandês encontra-se 
          abaixo do nível do mar.
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
