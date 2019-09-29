const express = require('express')
const AuthController = require('./controllers/AuthController')
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const UserController = require('./controllers/UserController')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()

routes.post('/auth/register', multer(multerConfig).single('file'), AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)

routes.use(AuthMiddleware)
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)

module.exports = routes
