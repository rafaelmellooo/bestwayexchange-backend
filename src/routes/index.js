const express = require('express')

const free = require('./free')
const logged = require('./logged')

const AuthMiddleware = require('../app/middlewares/AuthMiddleware')

const routes = express.Router()

routes.use(free)
routes.use(AuthMiddleware)
routes.use(logged)

module.exports = routes
