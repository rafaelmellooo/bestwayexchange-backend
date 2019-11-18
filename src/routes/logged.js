const express = require('express')

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

const routes = express.Router()

const only = {
  admin (req, res, next) {
    if (req.user.typeId === 3) return next()

    res.status(401).json()
  },

  adminAndEmployee (req, res, next) {
    if (req.user.typeId === 1) return res.status(401).json()

    next()
  },

  user (req, res, next) {
    if (req.user.typeId === 1) return next()

    res.status(401).json()
  },

  employeeAndUser (req, res, next) {
    if (req.user.typeId === 3) return res.status(401).json()

    next()
  },

  employee (req, res, next) {
    if (req.user.typeId === 2) return next()

    res.status(401).json()
  }
}

routes.post('/exchanges', only.adminAndEmployee, ExchangeController.store)

routes.route('/exchanges/:id', only.adminAndEmployee)
  .put(ExchangeController.update)
  .delete(ExchangeController.destroy)

routes.route('/users/:id')
  .put(UserController.update)
  .delete(UserController.destroy)

routes.get('/favorites', only.user, FavoriteController.index)

routes.route('/exchanges/:exchangeId/favorite', only.user)
  .post(FavoriteController.store)
  .delete(FavoriteController.destroy)

routes.route('/exchanges/:exchangeId/rate')
  .post(only.employee, RateController.store)
  .put(only.user, RateController.update)
  .delete(RateController.destroy)

routes.get('/chats', only.employeeAndUser, ChatController.index)
routes.post('/chats', only.user, ChatController.store)

routes.route('/exchanges/:exchangeId/messages', only.employeeAndUser)
  .get(MessageController.index)
  .post(MessageController.store)

routes.route('/agencies/:id/grade', only.user)
  .post(AgencyGradeController.store)
  .delete(AgencyGradeController.destroy)

routes.get('/users/:userId/notifications', only.employeeAndUser, NotificationController.index)

routes.post('/agencies', only.admin, AgencyController.store)

routes.route('/agencies/:id', only.admin)
  .put(AgencyController.update)
  .delete(AgencyController.destroy)

routes.post('/agencies/:agencyId/adresses', only.admin, AddressController.store)

routes.route('/agencies/:agencyId/adresses/:addressId', only.admin)
  .put(AddressController.update)
  .delete(AddressController.destroy)

routes.get('/agencies/:agencyId/logs', only.admin, LogController.show)
routes.get('/logs', only.admin, LogController.index)

module.exports = routes
