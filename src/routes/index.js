const express = require('express')

const admin = require('./admin')
const all = require('./all')
const common = require('./common')
const employee = require('./employee')

const AuthMiddleware = require('../app/middlewares/AuthMiddleware')

const routes = express.Router()

routes.use(all)
routes.use(AuthMiddleware)
routes.use(admin)
routes.use(common)
routes.use(employee)

module.exports = routes
