const { Op } = require('sequelize')

const Chat = require('../models/Chat')
const Exchange = require('../models/Exchange')
const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    try {

    } catch (err) {

    }
  },

  async show (req, res) {
    const { agencyId } = req.params

    try {
      const exchanges = await Exchange.findAll({
        where: {
          agencyId
        },
        attributes: ['id', 'name'],
        include: [
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
      })

      await Promise.all(exchanges.map(async exchange => {
        const date = new Date()
        date.setMonth(date.getMonth() - 1)

        const purchasers = await Rate.count({
          where: {
            exchangeId: exchange.id,
            createdAt: {
              [Op.gt]: date
            }
          }
        })

        const stakeholders = await Chat.count({
          where: {
            exchangeId: exchange.id,
            createdAt: {
              [Op.gt]: date
            }
          }
        })

        exchange.dataValues.purchasers = purchasers
        exchange.dataValues.stakeholders = stakeholders
      }))

      res.status(200).json(exchanges)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
