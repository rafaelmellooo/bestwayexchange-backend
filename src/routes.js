const express = require('express')
const AuthController = require('./app/controllers/AuthController')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const UserController = require('./app/controllers/UserController')
const FavoriteController = require('./app/controllers/FavoriteController')
const ExchangeController = require('./app/controllers/ExchangeController')
const AgencyController = require('./app/controllers/AgencyController')
const RateController = require('./app/controllers/RateController')
const ChatController = require('./app/controllers/ChatController')
const LanguageController = require('./app/controllers/LanguageController')
const ExchangeTypeController = require('./app/controllers/ExchangeTypeController')
const HousingTypeController = require('./app/controllers/HousingTypeController')
const CountryController = require('./app/controllers/CountryController')
const CityController = require('./app/controllers/CityController')
const UserAgencyController = require('./app/controllers/UserAgencyController')
const GradeController = require('./app/controllers/GradeController')
const ItemController = require('./app/controllers/ItemController')
// const multer = require('multer')
// const multerConfig = require('./config/multer')

const routes = express.Router()

// routes.post('/auth/register', multer(multerConfig).single('file'), AuthController.register)
routes.post('/auth/register', AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)
routes.post('/auth/send_email', AuthController.sendEmail)
routes.post('/auth/confirm_email', AuthController.confirmEmail)

routes.get('/exchanges/:exchangeId/rates', RateController.index)

routes.get('/languages', LanguageController.index)

routes.get('/exchange_types', ExchangeTypeController.index)

routes.get('/housing_types', HousingTypeController.index)

routes.get('/countries', CountryController.index)

routes.get('/countries/:id/cities', CityController.index)

routes.get('/agencies/:id/grades', UserAgencyController.index)

routes.use(AuthMiddleware)

routes.get('/users/:id', UserController.show)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.destroy)

routes.get('/favorites', FavoriteController.index)
routes.post('/exchanges/:exchangeId/favorite', FavoriteController.store)
routes.delete('/exchanges/:exchangeId/favorite', FavoriteController.destroy)

routes.get('/exchanges', ExchangeController.index)
routes.get('/exchanges/:id', ExchangeController.show)
routes.post('/exchanges', ExchangeController.store)
routes.put('/exchanges/:id', ExchangeController.update)
routes.delete('/exchanges/:id', ExchangeController.destroy)

routes.get('/agencies/:id', AgencyController.show)
routes.post('/agencies', AgencyController.store)
routes.put('/agencies/:id', AgencyController.update)
routes.delete('/agencies/:id', AgencyController.destroy)

routes.post('/exchanges/:exchangeId/rate', RateController.store)
routes.put('/exchanges/:exchangeId/rate', RateController.update)
routes.delete('/exchanges/:exchangeId/rate', RateController.destroy)

routes.get('/exchanges/:exchangeId/chat/:userId', ChatController.index)
routes.post('/exchanges/:exchangeId/chat/:userId', ChatController.store)

routes.post('/agencies/:id/grade', UserAgencyController.store)
routes.delete('/agencies/:id/grade', UserAgencyController.destroy)

routes.get('/grades', GradeController.index)

routes.get('/items/:id', ItemController.show)

module.exports = routes
