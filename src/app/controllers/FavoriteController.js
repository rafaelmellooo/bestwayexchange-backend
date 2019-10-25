const Favorite = require('../models/Favorite')

module.exports = {
  async index (req, res) {
    try {
      const exchanges = await Favorite.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          userId: req.user.id
        },
        attributes: ['createdAt'],
        include: [
          {
            association: 'exchange',
            attributes: ['id', 'name', 'description']
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
      const { user, params } = req
      const { exchangeId } = params
      const { id: userId } = user

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
      const { user, params } = req
      const { exchangeId } = params
      const { id: userId } = user

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
