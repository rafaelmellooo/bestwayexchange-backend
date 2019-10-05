const { Rate, User } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const rates = await Rate.findAll({
        where: {
          exchangeId: req.params.exchangeId
        },
        attributes: ['description', 'createdAt'],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['name']
          }
        ]
      })

      res.status(200).json(rates)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { userId, body } = req
      const { exchangeId, description } = body

      await Rate.create({
        userId, exchangeId, description
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      const { userId, params } = req

      await Rate.destroy({
        where: {
          userId,
          exchangeId: params.exchangeId
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
