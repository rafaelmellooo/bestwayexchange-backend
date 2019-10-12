const { Exchange, HousingType, ExchangeHousingType } = require('../models')

module.exports = {
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
              model: ExchangeHousingType,
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
