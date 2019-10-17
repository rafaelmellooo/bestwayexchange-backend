const Exchange = require('../models/Exchange')

module.exports = {
  async index (req, res) {
    try {
      let { page = 1, languagesId, housingTypesId, ...query } = req.query

      languagesId = languagesId ? { id: languagesId } : {}

      housingTypesId = housingTypesId ? { id: housingTypesId } : {}

      const exchanges = await Exchange.paginate({
        page,
        paginate: 10,
        order: [
          'id'
        ],
        where: query,
        attributes: ['id', 'name', 'description', 'price'],
        include: [
          {
            where: housingTypesId,
            association: 'housingTypes',
            attributes: [],
            through: {
              attributes: []
            }
          },
          {
            where: languagesId,
            association: 'languages',
            attributes: [],
            through: {
              attributes: []
            }
          }
        ]
      })

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
      const { languagesId, housingTypesId, ...data } = req.body

      const exchange = await Exchange.create(data)

      await exchange.setLanguages(languagesId)

      await exchange.setHousingTypes(housingTypesId)

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
