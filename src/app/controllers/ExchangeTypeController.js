const ExchangeType = require('../models/ExchangeType')

module.exports = {
  async index (req, res) {
    const exchangeTypes = await ExchangeType.findAll({
      order: [
        'name'
      ]
    })

    res.status(200).json(exchangeTypes)
  }
}
