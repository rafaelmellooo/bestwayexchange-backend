const express = require('express')

const AddressController = require('../app/controllers/AddressController')
const AgencyController = require('../app/controllers/AgencyController')
const LogController = require('../app/controllers/LogController')

const routes = express.Router()

routes.post('/agencies', AgencyController.store)

routes.route('/agencies/:id')
  .get(AgencyController.show)
  .put(AgencyController.update)
  .delete(AgencyController.destroy)

routes.post('/agencies/:agencyId/adresses', AddressController.store)

routes.route('/agencies/:agencyId/adresses/:addressId')
  .put(AddressController.update)
  .delete(AddressController.destroy)

routes.get('/agencies/:agencyId/logs', LogController.show)
routes.get('/logs', LogController.index)

module.exports = routes
