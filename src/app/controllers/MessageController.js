const Message = require('../models/Message')
const Chat = require('../models/Chat')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    const { chatId } = req.params
    const userId = req.user.id

    const type = {
      1: { userId },
      2: { employeeId: userId }
    }

    const chat = await Chat.findOne({
      where: {
        id: chatId,
        ...type[req.user.type]
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
        },
        isVisualized: false
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
    const { chatId } = req.params
    const userId = req.user.id

    const type = {
      1: {
        where: { userId },
        attributes: 'employeeId'
      },
      2: {
        where: { employeeId: userId },
        attributes: 'userId'
      }
    }

    const chat = await Chat.findOne({
      attributes: ['id', [type[req.user.type].attributes, 'user']],
      where: {
        id: chatId,
        ...type[req.user.type].where
      }
    })

    if (!chat) { return res.status(401).json() }

    const filename = req.file ? req.file.filename : undefined
    const { body } = req.body

    const message = await Message.create({
      body,
      filename,
      chatId,
      from: userId
    })

    const receiver = req.connectedUsers[chat.dataValues.user]

    if (receiver) {
      req.io.to(receiver).emit('response', message)
    }

    res.status(200).json(message)
  },

  async update (req, res) {
    const { chatId } = req.params
    const userId = req.user.id

    const type = {
      1: { userId },
      2: { employeeId: userId }
    }

    const chat = await Chat.findOne({
      where: {
        id: chatId,
        ...type[req.user.type]
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

    res.status(200).json()
  }
}
