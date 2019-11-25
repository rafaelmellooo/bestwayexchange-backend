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
//     q: 'França',
//     searchType: 'image',
//     num: 1
//   })

//   console.log(data.items)
// }

// search()

app.listen(3333)
