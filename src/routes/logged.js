const express = require('express')

const AddressController = require('../app/controllers/AddressController')
const AgencyController = require('../app/controllers/AgencyController')
const AgencyGradeController = require('../app/controllers/AgencyGradeController')
const ChatController = require('../app/controllers/ChatController')
const ExchangeController = require('../app/controllers/ExchangeController')
const FavoriteController = require('../app/controllers/FavoriteController')
const LogController = require('../app/controllers/LogController')
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

  common (req, res, next) {
    if (req.user.typeId === 1) return next()

    res.status(401).json()
  },

  commonAndEmployee (req, res, next) {
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

routes.get('/favorites', only.common, FavoriteController.index)

routes.route('/exchanges/:exchangeId/favorite', only.common)
  .post(FavoriteController.store)
  .delete(FavoriteController.destroy)

routes.route('/exchanges/:exchangeId/rate')
  .post(only.employee, RateController.store)
  .put(only.common, RateController.update)
  .delete(RateController.destroy)

routes.route('/exchanges/:exchangeId/chat/:userId', only.commonAndEmployee)
  .get(ChatController.index)
  .post(ChatController.store)

routes.route('/agencies/:id/grade', only.common)
  .post(AgencyGradeController.store)
  .delete(AgencyGradeController.destroy)

routes.get('/users/:userId/notifications', only.commonAndEmployee, NotificationController.index)

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
