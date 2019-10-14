const { Exchange, HousingType, City, Country, ExchangeType, Language } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let { languageId, housingTypeId, ...query } = req.query

      languageId = languageId ? { id: languageId } : {}

      housingTypeId = housingTypeId ? { id: housingTypeId } : {}

      const exchanges = await Exchange.findAll({
        order: [
          'name'
        ],
        where: query,
        attributes: ['id', 'name', 'description', 'price'],
        include: [
          {
            model: HousingType,
            where: housingTypeId,
            as: 'housingTypes',
            attributes: [],
            through: {
              attributes: []
            }
          },
          {
            model: Language,
            where: languageId,
            as: 'languages',
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
            model: HousingType,
            as: 'housingTypes',
            attributes: ['name', 'description'],
            through: {
              attributes: []
            }
          },
          {
            model: City,
            as: 'city',
            attributes: ['name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['name', 'description']
              }
            ]
          },
          {
            model: ExchangeType,
            as: 'exchangeType',
            attributes: ['name', 'description']
          },
          {
            model: Language,
            as: 'languages',
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
      await Exchange.create(req.body)

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
