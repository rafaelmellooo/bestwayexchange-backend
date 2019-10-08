const express = require('express')
const AuthController = require('./app/controllers/AuthController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const UserController = require('./app/controllers/UserController')
const FavoriteController = require('./app/controllers/FavoriteController')
const ExchangeController = require('./app/controllers/ExchangeController')
const AgencyController = require('./app/controllers/AgencyController')
const RateController = require('./app/controllers/RateController')
const ChatController = require('./app/controllers/ChatController')
// const multer = require('multer')
// const multerConfig = require('./config/multer')

const routes = express.Router()

// routes.post('/auth/register', multer(multerConfig).single('file'), AuthController.register)
routes.post('/auth/register', AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)
routes.post('/auth/send_email', AuthController.sendEmail)
routes.post('/auth/confirm_email', AuthController.confirmEmail)

routes.get('/exchanges/:exchangeId/rates', RateController.index)

routes.use(AuthMiddleware)

routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

routes.get('/favorites', FavoriteController.index)
routes.post('/exchanges/:exchangeId/favorite', FavoriteController.store)
routes.delete('/exchanges/:exchangeId/favorite', FavoriteController.destroy)

routes.get('/exchanges/:id', ExchangeController.show)
routes.post('/exchanges', ExchangeController.store)
routes.put('/exchanges/:id', ExchangeController.update)
routes.delete('/exchanges/:id', ExchangeController.destroy)

routes.get('/agencies/:id', AgencyController.show)
routes.post('/agencies', AgencyController.store)
routes.put('/agencies/:id', AgencyController.update)
routes.delete('/agencies/:id', AgencyController.destroy)

routes.post('/exchanges/:exchangeId/rate', RateController.store)
routes.delete('/exchanges/:exchangeId/rate', RateController.destroy)

routes.get('/exchanges/:exchangeId/chat/:userId', ChatController.index)
routes.post('/exchanges/:exchangeId/chat/:userId', ChatController.store)

module.exports = routes
