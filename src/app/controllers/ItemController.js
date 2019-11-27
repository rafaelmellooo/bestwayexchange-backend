const Item = require('../models/Item')

module.exports = {
  async index (req, res) {
    const item = await Item.findAll()

    res.status(200).json(item)
  }
}
