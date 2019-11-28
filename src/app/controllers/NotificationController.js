const { Op } = require('sequelize')
const Message = require('../models/Message')
const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    const userId = req.user.id

    const { page = 1 } = req.query

    const messages = await Message.paginate({
      page,
      paginate: 2,
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        from: {
          [Op.ne]: userId
        },
        isVisualized: false
      },
      attributes: ['body', 'filename', 'chatId', 'from']
    })

    const rates = await Rate.paginate({
      page,
      paginate: 2,
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        userId,
        isRated: false
      },
      attributes: ['exchangeId', 'createdAt']
    })

    res.status(200).json({ messages, rates })
  }
}
