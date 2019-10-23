const Chat = require('../models/Chat')
const Rate = require('../models/Rate')

module.exports = {
  async index (req, res) {
    const userId = req.params.userId

    if (req.userId !== parseInt(userId)) return res.status(401).json()

    try {
      const messages = await Chat.findAll({
        order: [
          ['createdAt', 'desc']
        ],
        where: {
          to: userId,
          isVisualized: false
        },
        attributes: ['message', 'from', 'createdAt', 'exchangeId']
      })

      const rates = await Rate.findAll({
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
      console.log(err)
      res.status(400).json(err)
    }
  }
}
