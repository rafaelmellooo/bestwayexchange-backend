const Exchange = require('../models/Exchange')
const Chat = require('../models/Chat')
const Message = require('../models/Message')
const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    const userId = req.user.id

    const type = {
      1: {
        where: { userId },
        association: 'employee'
      },
      2: {
        where: { employeeId: userId },
        association: 'user'
      }
    }

    const chats = await Chat.findAll({
      attributes: ['id'],
      order: [
        [
          'createdAt', 'DESC'
        ]
      ],
      where: type[req.user.type].where,
      include: [
        {
          association: 'exchange',
          attributes: ['id', 'name', 'filename']
        },
        {
          association: type[req.user.type].association,
          attributes: ['id', 'name', 'filename']
        }
      ]
    })

    await Promise.all(chats.map(async chat => {
      const unseenMessages = await Message.count({
        where: {
          chatId: chat.id,
          isVisualized: false
        }
      })

      chat.dataValues.unseenMessages = unseenMessages

      const user = chat.dataValues[type[req.user.type].association]

      delete chat.dataValues[type[req.user.type].association]

      chat.dataValues.user = user
    }))

    res.status(200).json(chats)
  },

  async show (req, res) {
    const type = {
      1: 'employee',
      2: 'user'
    }

    const chat = await Chat.findByPk(req.params.id, {
      attributes: ['id'],
      include: [
        {
          association: type[req.user.type],
          attributes: ['id', 'name', 'filename', 'dateOfBirth', 'email']
        },
        {
          association: 'exchange',
          attributes: ['id', 'name', 'filename', 'description']
        }
      ]
    })

    const user = chat.dataValues[type[req.user.type]]

    delete chat.dataValues[type[req.user.type]]

    chat.dataValues.user = user

    const rate = await Rate.findOne({
      where: {
        userId: chat.dataValues.user.id,
        exchangeId: chat.dataValues.exchange.id
      }
    })

    const alreadyBought = !!rate

    res.status(200).json({ chat, alreadyBought })
  },

  async store (req, res) {
    const { exchangeId } = req.body
    const userId = req.user.id

    let chat = await Chat.findOne({
      attributes: ['id'],
      where: {
        exchangeId, userId
      }
    })

    if (chat) { return res.status(200).json(chat.id) }

    const response = await Exchange.findByPk(exchangeId, {
      attributes: [],
      include: [
        {
          association: 'agency',
          attributes: ['id'],
          include: [
            {
              association: 'users',
              attributes: ['id']
            }
          ]
        }
      ]
    })

    const employeeId = response.agency.users[Math.floor(Math.random() * response.agency.users.length)].id

    chat = await Chat.create({
      exchangeId, userId, employeeId
    })

    res.status(200).json(chat.id)
  }
}
