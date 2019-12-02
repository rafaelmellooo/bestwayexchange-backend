const { Op } = require('sequelize')
const Message = require('../models/Message')
const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    const userId = req.user.id

    const type = {
      1: { userId },
      2: { employeeId: userId }
    }

    const { page = 1 } = req.query

    const messages = await Message.paginate({
      attributes: ['createdAt'],
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
      include: [
        {
          association: 'user',
          attributes: ['id', 'name', 'filename']
        },
        {
          association: 'chat',
          where: type[req.user.type],
          attributes: ['id'],
          include: [
            {
              association: 'exchange',
              attributes: ['id', 'name', 'filename']
            }
          ]
        }
      ]
    })

    messages.docs.map(message => {
      delete message.chatId
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
      attributes: ['id', 'createdAt'],
      include: [
        {
          association: 'exchanges',
          attributes: ['id', 'name', 'filename']
        }
      ]
    })

    res.status(200).json({ messages, rates })
  }
}
