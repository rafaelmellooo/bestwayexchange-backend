require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

require('./database')

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on('connection', socket => {
  const { userId } = socket.handshake.query

  connectedUsers[userId] = socket.io
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers

  next()
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes)

server.listen(3333)
