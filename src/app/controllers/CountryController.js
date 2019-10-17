const Country = require('../models/Country')

module.exports = {
  async index (req, res) {
    try {
      const countries = await Country.findAll({
        order: [
          'name'
        ]
      })

      res.status(200).json(countries)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
