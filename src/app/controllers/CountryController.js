const { Country } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const countries = await Country.findAll()

      res.status(200).json(countries)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
