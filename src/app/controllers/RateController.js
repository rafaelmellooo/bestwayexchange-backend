const { Rate, User, Item } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const rates = await Rate.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          exchangeId: req.params.exchangeId
        },
        attributes: ['id', 'description', 'createdAt', 'updatedAt'],
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['name']
          },
          {
            model: Item,
            as: 'items',
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
        }
      })

      await rate.update({ description })

      await Promise.all(items.map(async ({ itemId, gradeId }) => {
        await rate.addItem(itemId, {
          through: { gradeId }
        })
      }))

      res.status(200).json()
    } catch (err) {
      console.log(err)
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
