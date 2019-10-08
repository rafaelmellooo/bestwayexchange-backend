const { Chat } = require('../models')
const sequelize = require('sequelize')
const { Op } = sequelize

module.exports = {
  async index (req, res) {
    try {
      const { userId: from, params } = req
      const { userId: to, exchangeId } = params

      const chat = await Chat.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { from }, { to: from }
              ]
            },
            {
              [Op.or]: [
                { to }, { from: to }
              ]
            },
            {
              exchangeId
            }
          ]
        },
        order: [
          ['createdAt', 'ASC']
        ],
        attributes: ['from', 'to', 'message', 'createdAt', [
          sequelize.fn('date_format', sequelize.col('createdAt'), '%d/%m/%Y %H:%i:%s'), 'createdAt'
        ]]
      })

      res.status(200).json(chat)
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { userId: from, params, body } = req
      const { userId: to, exchangeId } = params

      const message = await Chat.create({
        from, to, message: body.message, exchangeId
      })

      res.status(200).json(message)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
