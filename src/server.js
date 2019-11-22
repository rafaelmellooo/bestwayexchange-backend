require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const routes = require('./routes')

require('./database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes)

// const { google } = require('googleapis')
// const customSearch = google.customsearch('v1')

// const googleSearchCredentials = require('./config/googleapis')

// async function search () {
//   const { data } = await customSearch.cse.list({
//     auth: googleSearchCredentials.apiKey,
//     cx: googleSearchCredentials.searchEngineId,
//     q: 'Estados Unidos',
//     searchType: 'image',
//     num: 1
//   })

//   console.log(data.items)
// }

// search()

// const algorithmia = require('algorithmia')
// const algorithmiaApiKey = require('./config/algorithmia').apiKey

// async function fetchContentFromWikipedia () {
//   const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
//   const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
//   const wikipediaResponse = await wikipediaAlgorithm.pipe({
//     lang: 'pt',
//     articleName: 'Holanda'
//   })
//   const wikipediaContent = wikipediaResponse.get()
//   const sourceContentOriginal = wikipediaContent.content

//   const summarizerAlgorithm = algorithmiaAuthenticated.algo('nlp/Summarizer/0.1.8')
//   const summarizerResponse = await summarizerAlgorithm.pipe(sanitizeContent(sourceContentOriginal))
//   const summarizerContent = summarizerResponse.get()
//   console.log(summarizerContent)
// }

// function sanitizeContent (content) {
//   const removeBlankLines = content => {
//     const allLines = content.split('\n')

//     return allLines.filter(line => {
//       if (line.trim().length) { return true }

//       return false
//     })
//   }

//   const removeMarkdown = content => {
//     return content.filter(line => {
//       if (line.trim().startsWith('=')) { return false }

//       return true
//     })
//   }

//   const withoutBlankLines = removeBlankLines(content)
//   const withoutMarkdown = removeMarkdown(withoutBlankLines)

//   return withoutMarkdown.join(' ')
// }

// fetchContentFromWikipedia()

app.listen(3333)
