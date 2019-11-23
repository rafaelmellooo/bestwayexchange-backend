const Country = require('../models/Country')

module.exports = {
  async index (req, res) {
    const countries = await Country.findAll({
      attributes: ['id', 'name', 'filename']
    })

    res.status(200).json(countries)
  }
}
