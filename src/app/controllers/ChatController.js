const { Op } = require('sequelize')
const Exchange = require('../models/Exchange')
const Chat = require('../models/Chat')

module.exports = {
  async index (req, res) {
    const userId = req.user.id

    const chats = await Chat.findAll({
      order: [
        [
          'createdAt', 'DESC'
        ]
      ],
      where: {
        [Op.or]: [
          { employeeId: userId },
          { userId }
        ]
      }
    })

    res.status(200).json(chats)
  },

  async store (req, res) {
    const { exchangeId } = req.body
    const userId = req.user.id
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

    await Chat.create({
      exchangeId, userId, employeeId
    })

    res.status(200).json()
  }
}
