const Chat = require('../models/Chat')
const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    const userId = req.params.userId

    if (req.user.id !== parseInt(userId)) return res.status(401).json()

    try {
      const { page = 1 } = req.query

      const messages = await Chat.paginate({
        page,
        paginate: 5,
        order: [
          ['createdAt', 'desc']
        ],
        where: {
          to: userId,
          isVisualized: false
        },
        attributes: ['message', 'from', 'createdAt', 'exchangeId']
      })

      const rates = await Rate.paginate({
        page,
        paginate: 5,
        order: [
          ['createdAt', 'desc']
        ],
        where: {
          userId,
          isRated: false
        },
        attributes: ['exchangeId', 'createdAt']
      })

      res.status(200).json({ messages, rates })
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
