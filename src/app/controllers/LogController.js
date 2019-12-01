const { Op } = require('sequelize')
const { setMonth, getMonth } = require('date-fns')
const Exchange = require('../models/Exchange')
const Rate = require('../models/Rate')
const Chat = require('../models/Chat')

module.exports = {
  async show (req, res) {
    const agency = req.user.agency

    try {
      const exchanges = await Exchange.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          agencyId: agency
        },
        attributes: ['id', 'name']
      })

      await Promise.all(exchanges.map(async exchange => {
        const today = new Date()
        const lastMonth = setMonth(today, getMonth(today) - 1)

        const purchasers = await Rate.count({
          where: {
            exchangeId: exchange.id,
            createdAt: {
              [Op.gt]: lastMonth
            }
          }
        })

        const stakeholders = await Chat.count({
          where: {
            exchangeId: exchange.id,
            createdAt: {
              [Op.gt]: lastMonth
            }
          }
        })

        exchange.dataValues.purchasers = purchasers
        exchange.dataValues.stakeholders = stakeholders
      }))

      res.status(200).json(exchanges)
    } catch (err) {
      console.log(err)
    }
  }
}
