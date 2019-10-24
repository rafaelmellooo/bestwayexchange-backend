const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')

require('./database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use(routes)

app.listen(3333)
