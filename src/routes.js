const express = require('express')
const AuthController = require('./app/controllers/AuthController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const UserController = require('./app/controllers/UserController')
const FavoriteController = require('./app/controllers/FavoriteController')
const ExchangeController = require('./app/controllers/ExchangeController')
const AgencyController = require('./app/controllers/AgencyController')
const RateController = require('./app/controllers/RateController')
// const multer = require('multer')
// const multerConfig = require('./config/multer')

const routes = express.Router()

// routes.post('/auth/register', multer(multerConfig).single('file'), AuthController.register)
routes.post('/auth/register', AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)
routes.post('/auth/send_email', AuthController.sendEmail)
routes.post('/auth/confirm_email', AuthController.confirmEmail)

routes.get('/rates/:exchangeId', RateController.index)

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

routes.get('/agencies/:id', AgencyController.show)
routes.post('/agencies', AgencyController.store)
routes.put('/agencies/:id', AgencyController.update)
routes.delete('/agencies/:id', AgencyController.destroy)

routes.post('/rates', RateController.store)
routes.delete('/rates/:exchangeId', RateController.destroy)

module.exports = routes
