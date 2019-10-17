const ExchangeType = require('../models/ExchangeType')

module.exports = {
  async index (req, res) {
    try {
      const exchangeTypes = await ExchangeType.findAll({
        order: [
          'name'
        ]
      })

      res.status(200).json(exchangeTypes)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
