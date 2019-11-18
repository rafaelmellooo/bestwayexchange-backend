const Chat = require('../models/Chat')

module.exports = {
  async index (req, res) {
    try {
      if (req.user.id !== req.params.id) return res.status(401).json()

      const chats = await Chat.findAll({
        where: {
          from: req.params.id
        }
      })

      res.status(200).json(chats)
    } catch (err) {
      res.status(400).json()
    }
  }
}
