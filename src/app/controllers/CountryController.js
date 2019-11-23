const Country = require('../models/Country')
const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../../config/algorithmia').apiKey

async function fetchContentFromWikipedia (articleName) {
  const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
  const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
  const wikipediaResponse = await wikipediaAlgorithm.pipe({
    lang: 'pt',
    articleName
  })
  const wikipediaContent = wikipediaResponse.get()
  const sourceContentOriginal = wikipediaContent.content

  const summarizerAlgorithm = algorithmiaAuthenticated.algo('nlp/Summarizer/0.1.8')
  const summarizerResponse = await summarizerAlgorithm.pipe(sanitizeContent(sourceContentOriginal))

  return summarizerResponse.get()
}

function sanitizeContent (content) {
  const removeBlankLines = content => {
    const allLines = content.split('\n')

    return allLines.filter(line => {
      if (line.trim().length) { return true }

      return false
    })
  }

  const removeMarkdown = content => {
    return content.filter(line => {
      if (line.trim().startsWith('=')) { return false }

      return true
    })
  }

  const withoutBlankLines = removeBlankLines(content)
  const withoutMarkdown = removeMarkdown(withoutBlankLines)

  return withoutMarkdown.join(' ')
}

module.exports = {
  async index (req, res) {
    const countries = await Country.findAll({
      attributes: ['id', 'name'],
      order: [
        'name'
      ]
    })

    res.status(200).json(countries)
  },

  async store (req, res) {
    const { name } = req.body

    const description = await fetchContentFromWikipedia(name)

    res.status(200).json({ name, description })
  }
}
