const Country = require('../models/Country')
const https = require('https')
const path = require('path')
const fs = require('fs')
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

    // const description = await fetchContentFromWikipedia(name)

    const description = 'Lorem ipsung atalçta dikrhrr'

    const filename = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCU-Z0OJXjEHZCObPtOmcIbJ96HY3_Yp1bc6l5tO4QK2WXddq2'

    const file = fs.createWriteStream(path.resolve(__dirname, '..', '..', '..', 'uploads', 'banana.png'))

    https.get(filename, response => {
      response.pipe(file)

      res.status(200).json({ name, description, file })
    })
  }
}
