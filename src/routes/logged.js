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
const BackgroundController = require('../app/controllers/BackgroundController')
const CityController = require('../app/controllers/CityController')
const CountryController = require('../app/controllers/CountryController')
const DashboardController = require('../app/controllers/DashboardController')

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

routes.route('/exchanges/:id')
  .put(only.adminAndEmployee, ExchangeController.update)
  .delete(only.adminAndEmployee, ExchangeController.destroy)

routes.route('/users/:id')
  .put(UserController.update)
  .delete(UserController.destroy)

routes.get('/favorites', only.user, FavoriteController.index)

routes.route('/exchanges/:exchangeId/favorites')
  .get(only.user, FavoriteController.show)
  .post(only.user, FavoriteController.store)
  .delete(only.user, FavoriteController.destroy)

routes.route('/exchanges/:exchangeId/rates')
  .post(only.employee, RateController.store)

routes.route('/rates/:id')
  .put(only.user, RateController.update)
  .delete(only.user, RateController.destroy)

routes.route('/chats')
  .get(only.employeeAndUser, ChatController.index)
  .post(only.user, ChatController.store)

routes.get('/chats/:id', only.employeeAndUser, ChatController.show)

routes.route('/chats/:chatId/messages')
  .get(only.employeeAndUser, MessageController.index)
  .post(only.employeeAndUser, upload.single('filename'), MessageController.store)
  .put(only.employeeAndUser, MessageController.update)

routes.route('/agencies/:agencyId/grades')
  .post(only.user, AgencyGradeController.store)
  .delete(only.user, AgencyGradeController.destroy)

routes.get('/notifications', only.employeeAndUser, NotificationController.index)

routes.post('/agencies', only.admin, upload.single('logo'), AgencyController.store)

routes.route('/agencies/:id')
  .put(only.admin, AgencyController.update)
  .delete(only.admin, AgencyController.destroy)

routes.post('/agencies/:agencyId/addresses', only.admin, AddressController.store)

routes.route('/addresses/:id')
  .put(only.admin, AddressController.update)
  .delete(only.admin, AddressController.destroy)

routes.get('/log', only.admin, LogController.show)

routes.get('/backgrounds', only.admin, BackgroundController.index)

routes.post('/countries', only.admin, CountryController.store)

routes.post('/countries/:countryId/cities', only.admin, CityController.store)

routes.get('/dashboard', DashboardController.show)

module.exports = routes
