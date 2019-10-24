const express = require('express')

const ExchangeController = require('../app/controllers/ExchangeController')

const routes = express.Router()

routes.route('/exchanges')
  .get(ExchangeController.index)
  .post(ExchangeController.store)

routes.route('/exchanges/:id')
  .get(ExchangeController.show)
  .put(ExchangeController.update)
  .delete(ExchangeController.destroy)

module.exports = routes
