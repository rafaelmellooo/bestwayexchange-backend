const express = require('express')
const AuthController = require('./app/controllers/AuthController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const UserController = require('./app/controllers/UserController')
const FavoriteController = require('./app/controllers/FavoriteController')
const ExchangeController = require('./app/controllers/ExchangeController')
// const multer = require('multer')
// const multerConfig = require('./config/multer')

const routes = express.Router()

// routes.post('/auth/register', multer(multerConfig).single('file'), AuthController.register)
routes.post('/auth/register', AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)
routes.post('/auth/send_email', AuthController.sendEmail)
routes.post('/auth/confirm_email', AuthController.confirmEmail)

routes.use(AuthMiddleware)

routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

routes.get('/favorites', FavoriteController.index)
routes.post('/favorites', FavoriteController.store)
routes.delete('/favorites/:exchangeId', FavoriteController.destroy)

routes.get('/exchanges/:id', ExchangeController.show)
routes.post('/exchanges', ExchangeController.store)
routes.put('/exchanges/:id', ExchangeController.update)
routes.delete('/exchanges/:id', ExchangeController.destroy)

module.exports = routes
