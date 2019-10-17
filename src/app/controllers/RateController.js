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
          hasRated: true
        },
        attributes: ['id', 'description', 'updatedAt'],
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
      const { userId, params } = req
      const { exchangeId } = params

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
      const { userId, params, body } = req
      const { exchangeId } = params
      const { description, items } = body

      const rate = await Rate.findOne({
        where: {
          userId, exchangeId
        },
        attributes: ['id', 'hasRated']
      })

      if (rate.hasRated) return res.status(401).json()

      await rate.update({ description, hasRated: true })

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
