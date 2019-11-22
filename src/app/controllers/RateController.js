const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    const { page = 1 } = req.query

    const rates = await Rate.paginate({
      page,
      paginate: 10,
      order: [
        ['updatedAt', 'DESC']
      ],
      where: {
        exchangeId: req.params.exchangeId,
        isRated: true
      },
      attributes: ['id', 'comment', 'updatedAt'],
      include: [
        {
          association: 'users',
          attributes: ['name']
        },
        {
          association: 'items',
          attributes: ['name'],
          through: {
            as: 'pivot',
            attributes: ['gradeId']
          }
        }
      ]
    })

    res.status(200).json(rates)
  },

  async store (req, res) {
    const { exchangeId } = req.params
    const userId = req.user.id

    await Rate.create({
      userId, exchangeId
    })

    res.status(200).json()
  },

  async update (req, res) {
    const { exchangeId } = req.params
    const userId = req.user.id
    const { description, items } = req.body

    const rate = await Rate.findOne({
      where: {
        userId, exchangeId
      },
      attributes: ['id', 'isRated']
    })

    if (rate.isRated) { return res.status(401).json() }

    try {
      await rate.update({ description, isRated: true })

      await Promise.all(items.map(async ({ itemId, gradeId }) => {
        await rate.addItem(itemId, {
          through: { gradeId }
        })
      }))

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    const { exchangeId } = req.params
    const userId = req.user.id

    await Rate.destroy({
      where: {
        userId,
        exchangeId
      }
    })

    res.status(200).json()
  }
}
