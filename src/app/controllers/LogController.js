const { Op } = require('sequelize')
const Exchange = require('../models/Exchange')
const Rate = require('../models/Rate')
const Chat = require('../models/Chat')

module.exports = {
  async show (req, res) {
    const { agencyId } = req.params

    const exchanges = await Exchange.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        agencyId
      },
      attributes: ['id', 'name', 'createdAt']
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
  }
}
