const Exchange = require('../models/Exchange')

module.exports = {
  async index (req, res) {
    try {
      const { page = 1, exchangeTypes, city, languages, housingTypes } = req.query

      const options = {
        page,
        paginate: 10,
        order: [
          'id'
        ],
        where: {
          exchangeTypeId: exchangeTypes ? exchangeTypes.split(',') : undefined,
          cityId: city
        },
        attributes: ['id', 'name', 'description', 'price'],
        include: [
          {
            where: {
              id: languages ? languages.split(',') : undefined
            },
            association: 'languages',
            attributes: [],
            through: {
              attributes: []
            }
          },
          {
            where: {
              id: housingTypes ? housingTypes.split(',') : undefined
            },
            association: 'housingTypes',
            attributes: [],
            through: {
              attributes: []
            }
          }
        ]
      }

      Object.keys(options.where).forEach(key => options.where[key] === undefined && delete options.where[key])

      options.include.map(association => {
        Object.keys(association.where).forEach(key => association.where[key] === undefined && delete association.where[key])
      })

      const exchanges = await Exchange.paginate(options)

      res.status(200).json(exchanges)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async show (req, res) {
    try {
      const exchange = await Exchange.findByPk(req.params.id, {
        attributes: ['name', 'description'],
        include: [
          {
            association: 'housingTypes',
            attributes: ['name', 'description'],
            through: {
              attributes: []
            }
          },
          {
            association: 'city',
            attributes: ['name'],
            include: {
              association: 'country',
              attributes: ['name', 'description']
            }
          },
          {
            association: 'exchangeType',
            attributes: ['name', 'description']
          },
          {
            association: 'languages',
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        ]
      })

      res.status(200).json(exchange)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { filename } = req.file

      const { languages, housingTypes, ...data } = req.body

      const exchange = await Exchange.create({ ...data, filename })

      await exchange.setLanguages(languages)

      await exchange.setHousingTypes(housingTypes)

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    try {
      await Exchange.update(req.body, {
        where: {
          id: req.params.id
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      await Exchange.destroy({
        where: {
          id: req.params.id
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
