const { User, Exchange, Favorite } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const exchanges = await User.findByPk(req.userId, {
        attributes: ['email', 'name'],
        include: [
          {
            model: Exchange,
            attributes: ['id', 'name', 'description'],
            as: 'exchanges',
            through: {
              attributes: ['createdAt']
            }
          }
        ]
      })

      return res.status(200).json(exchanges)
    } catch (err) {
      return res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      await Favorite.create({
        userId: req.userId,
        exchangeId: req.body.exchangeId
      })

      return res.status(200).json()
    } catch (err) {
      return res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      await Favorite.destroy({
        where: {
          userId: req.userId,
          exchangeId: req.params.exchange_id
        }
      })

      return res.status(200).json()
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}
