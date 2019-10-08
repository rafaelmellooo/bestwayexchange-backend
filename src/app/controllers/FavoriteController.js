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
              model: Favorite,
              as: 'favorite',
              attributes: ['createdAt']
            }
          }
        ]
      })

      res.status(200).json(exchanges)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { userId, params } = req
      const { exchangeId } = params

      await Favorite.create({
        userId,
        exchangeId
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      const { userId, params } = req
      const { exchangeId } = params

      await Favorite.destroy({
        where: {
          userId,
          exchangeId
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
