const express = require('express')
const multer = require('multer')
const uploadConfig = require('../config/upload')

const AddressController = require('../app/controllers/AddressController')
const AgencyController = require('../app/controllers/AgencyController')
const AgencyGradeController = require('../app/controllers/AgencyGradeController')
const ChatController = require('../app/controllers/ChatController')
const ExchangeController = require('../app/controllers/ExchangeController')
const FavoriteController = require('../app/controllers/FavoriteController')
const LogController = require('../app/controllers/LogController')
const MessageController = require('../app/controllers/MessageController')
const NotificationController = require('../app/controllers/NotificationController')
const RateController = require('../app/controllers/RateController')
const UserController = require('../app/controllers/UserController')
const RankingController = require('../app/controllers/RankingController')
const BackgroundController = require('../app/controllers/BackgroundController')
const CityController = require('../app/controllers/CityController')
const CountryController = require('../app/controllers/CountryController')

const routes = express.Router()
const upload = multer(uploadConfig)

const only = {
  admin (req, res, next) {
    if (req.user.type === 3) { return next() }

    res.status(401).json()
  },

  adminAndEmployee (req, res, next) {
    if (req.user.type === 1) { return res.status(401).json() }

    next()
  },

  user (req, res, next) {
    if (req.user.type === 1) { return next() }

    res.status(401).json()
  },

  employeeAndUser (req, res, next) {
    if (req.user.type === 3) { return res.status(401).json() }

    next()
  },

  employee (req, res, next) {
    if (req.user.type === 2) { return next() }

    res.status(401).json()
  }
}

routes.post('/exchanges', only.adminAndEmployee, upload.single('thumbnail'), ExchangeController.store)

routes.route('/exchanges/:id', only.adminAndEmployee)
  .put(ExchangeController.update)
  .delete(ExchangeController.destroy)

routes.route('/users/:id')
  .put(UserController.update)
  .delete(UserController.destroy)

routes.get('/favorites', only.user, FavoriteController.index)

routes.route('/exchanges/:exchangeId/favorites', only.user)
  .post(FavoriteController.store)
  .delete(FavoriteController.destroy)

routes.route('/exchanges/:exchangeId/rates')
  .post(only.employee, RateController.store)
  .put(only.user, RateController.update)
  .delete(RateController.destroy)

routes.get('/chats', only.employeeAndUser, ChatController.index)
routes.post('/chats', only.user, ChatController.store)
routes.get('/chats/:id', only.employeeAndUser, MessageController.index)
routes.post('/chats/:id', only.employeeAndUser, MessageController.store)

routes.route('/agencies/:id/grades', only.user)
  .post(AgencyGradeController.store)
  .delete(AgencyGradeController.destroy)

routes.get('/notifications', only.employeeAndUser, NotificationController.index)

routes.post('/agencies', only.admin, upload.single('logo'), AgencyController.store)

routes.route('/agencies/:id', only.admin)
  .put(AgencyController.update)
  .delete(AgencyController.destroy)

routes.post('/adresses', only.admin, AddressController.store)

routes.route('adresses/:id', only.admin)
  .put(AddressController.update)
  .delete(AddressController.destroy)

routes.get('/agencies/:agencyId/logs', only.admin, LogController.show)
routes.get('/rankings', only.admin, RankingController.show)

routes.get('/backgrounds', only.admin, BackgroundController.index)

routes.post('/countries', only.admin, CountryController.store)

routes.post('/countries/:countryId/cities', only.admin, CityController.store)

module.exports = routes
