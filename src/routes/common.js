const express = require('express')

const AgencyGradeController = require('../app/controllers/AgencyGradeController')
const ChatController = require('../app/controllers/ChatController')
const FavoriteController = require('../app/controllers/FavoriteController')
const NotificationController = require('../app/controllers/NotificationController')
const RateController = require('../app/controllers/RateController')
const UserController = require('../app/controllers/UserController')

const routes = express.Router()

routes.route('/users/:id')
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.destroy)

routes.get('/favorites', FavoriteController.index)
routes.route('/exchanges/:exchangeId/favorite')
  .post(FavoriteController.store)
  .delete(FavoriteController.destroy)

routes.route('/exchanges/:exchangeId/rate')
  .post(RateController.store)
  .put(RateController.update)
  .delete(RateController.destroy)

routes.route('/exchanges/:exchangeId/chat/:userId')
  .get(ChatController.index)
  .post(ChatController.store)

routes.route('/agencies/:id/grade')
  .post(AgencyGradeController.store)
  .delete(AgencyGradeController.destroy)

routes.get('/users/:userId/notifications', NotificationController.index)

module.exports = routes
