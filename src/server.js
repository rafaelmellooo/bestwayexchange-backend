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

app.listen(3333)
