const Message = require('../models/Message')
const Chat = require('../models/Chat')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    const chatId = req.params.id

    console.log(req.chats)

    if (!req.chats.includes(chatId)) { return res.status(401).json() }

    const { page = 1 } = req.query

    const messages = await Message.paginate({
      page,
      paginate: 10,
      where: {
        chatId
      }
    })

    res.status(200).json(messages)
  },

  async store (req, res) {

  }
}
