const Item = require('../models/Item')

module.exports = {
  async show (req, res) {
    try {
      const item = await Item.findByPk(req.params.id)

      res.status(200).json(item)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
