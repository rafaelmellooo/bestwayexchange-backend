const Message = require('../models/Message')
const Chat = require('../models/Chat')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    const chatId = req.params.id
    const userId = req.user.id

    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { employeeId: userId },
          { userId }
        ],
        id: chatId
      }
    })

    if (!chat) { return res.status(401).json() }

    await Message.update({
      isVisualized: true
    }, {
      where: {
        chatId,
        from: {
          [Op.ne]: userId
        }
      }
    })

    const { page = 1 } = req.query

    const messages = await Message.paginate({
      order: [
        ['createdAt', 'DESC']
      ],
      attributes: ['body', 'filename', 'from', 'createdAt'],
      page,
      paginate: 10,
      where: {
        chatId
      }
    })

    res.status(200).json(messages)
  },

  async store (req, res) {
    const chatId = req.params.id
    const userId = req.user.id

    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { employeeId: userId },
          { userId }
        ],
        id: chatId
      }
    })

    if (!chat) { return res.status(401).json() }

    const { body } = req.body

    await Message.create({
      body,
      chatId,
      from: userId
    })

    res.status(200).json()
  }
}
