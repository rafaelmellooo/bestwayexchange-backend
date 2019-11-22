const Item = require('../models/Item')

module.exports = {
  async show (req, res) {
    const item = await Item.findByPk(req.params.id)

    res.status(200).json(item)
  }
}
