const Country = require('../models/Country')

module.exports = {
  async index (req, res) {
    const countries = await Country.findAll({
      order: [
        'name'
      ]
    })

    res.status(200).json(countries)
  },

  async store (req, res) {
    
  }
}
