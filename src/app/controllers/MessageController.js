const Chat = require('../models/Chat')
const sequelize = require('sequelize')
const { Op } = sequelize

module.exports = {
  async index (req, res) {
    try {
      const { page = 1 } = req.query

      const { exchangeId } = req.params

      await Chat.update({ isVisualized: true }, {
        where: {
          [Op.and]: [
            { from: to },
            { to: from },
            { isVisualized: false }
          ]
        }
      })

      const messages = await Chat.paginate({
        page,
        paginate: 10,
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { from: req.user.id },
                { exchangeId }
              ],
              [Op.and]: [
                { to: req.user.id },
                { exchangeId }
              ]
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

      res.status(200).json(messages)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { user, params, body } = req
      const { userId: to, exchangeId } = params
      const { id: from } = user

      const message = await Chat.create({
        from, to, message: body.message, exchangeId
      })

      res.status(200).json(message)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
