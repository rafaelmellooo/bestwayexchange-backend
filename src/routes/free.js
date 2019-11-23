const express = require('express')
const multer = require('multer')
const uploadConfig = require('../config/upload')

const AgencyController = require('../app/controllers/AgencyController')
const AgencyGradeController = require('../app/controllers/AgencyGradeController')
const AuthController = require('../app/controllers/AuthController')
const CityController = require('../app/controllers/CityController')
const CountryController = require('../app/controllers/CountryController')
const ExchangeController = require('../app/controllers/ExchangeController')
const ExchangeTypeController = require('../app/controllers/ExchangeTypeController')
const GradeController = require('../app/controllers/GradeController')
const HousingTypeController = require('../app/controllers/HousingTypeController')
const ItemController = require('../app/controllers/ItemController')
const LanguageController = require('../app/controllers/LanguageController')
const RateController = require('../app/controllers/RateController')
const UserController = require('../app/controllers/UserController')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/auth/register', upload.single('profile'), AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)
routes.post('/auth/send_email', AuthController.sendEmail)
routes.post('/auth/confirm_email', AuthController.confirmEmail)

routes.get('/exchanges/:exchangeId/rates', RateController.index)

routes.get('/languages', LanguageController.index)

routes.get('/exchange_types', ExchangeTypeController.index)

routes.get('/housing_types', HousingTypeController.index)

routes.get('/countries', CountryController.index)

routes.get('/countries/:countryId/cities', CityController.index)

routes.get('/agencies/:id/grades', AgencyGradeController.index)

routes.get('/grades', GradeController.index)

routes.get('/items/:id', ItemController.show)

routes.get('/exchanges', ExchangeController.index)

routes.get('/exchanges/:id', ExchangeController.show)

routes.get('/agencies/:id', AgencyController.show)

routes.get('/users/:id', UserController.show)

module.exports = routes
