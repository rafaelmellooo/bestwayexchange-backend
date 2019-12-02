const Favorite = require('../models/Favorite')

module.exports = {
  async index (req, res) {
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
          attributes: ['id', 'name', 'filename', 'createdAt', 'time', 'price'],
          include: [
            {
              association: 'exchangeType',
              attributes: ['name']
            },
            {
              association: 'city',
              attributes: ['name'],
              include: [
                {
                  association: 'country',
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ]
    })

    res.status(200).json(exchanges)
  },

  async show (req, res) {
    const { exchangeId } = req.params

    const favorite = await Favorite.findOne({
      where: {
        exchangeId,
        userId: req.user.id
      }
    })

    res.status(200).json(!!favorite)
  },

  async store (req, res) {
    const { exchangeId } = req.params
    const userId = req.user.id

    await Favorite.create({
      userId,
      exchangeId
    })

    res.status(200).json()
  },

  async destroy (req, res) {
    const { exchangeId } = req.params
    const userId = req.user.id

    await Favorite.destroy({
      where: {
        userId,
        exchangeId
      }
    })

    res.status(200).json()
  }
}
