const Exchange = require('../models/Exchange')
const Chat = require('../models/Chat')

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
