const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    try {
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
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { user, params } = req
      const { exchangeId } = params
      const { id: userId } = user

      await Rate.create({
        userId, exchangeId
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    try {
      const { user, params, body } = req
      const { exchangeId } = params
      const { description, items } = body
      const { id: userId } = user

      const rate = await Rate.findOne({
        where: {
          userId, exchangeId
        },
        attributes: ['id', 'isRated']
      })

      if (rate.isRated) return res.status(401).json()

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
    try {
      const { user, params } = req
      const { id: userId } = user

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
