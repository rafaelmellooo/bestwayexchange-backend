const Country = require('../models/Country')
const path = require('path')
const download = require('image-downloader')
const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../../config/algorithmia').apiKey
const { google } = require('googleapis')
const customSearch = google.customsearch('v1')

const googleSearchCredentials = require('../../config/googleapis')

async function fetchGoogleAndReturnImageLink (q) {
  const { data } = await customSearch.cse.list({
    auth: googleSearchCredentials.apiKey,
    cx: googleSearchCredentials.searchEngineId,
    q,
    searchType: 'image',
    num: 1
  })

  return data.items[0].link
}

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

    const link = await fetchGoogleAndReturnImageLink(name)

    const filename = `${name}-${Date.now()}.jpg`

    const pathname = path.resolve(__dirname, '..', '..', '..', 'uploads', filename)

    await download.image({ url: link, dest: pathname })

    const country = await Country.create({ name, description, filename })

    res.status(200).json(country)
  }
}
