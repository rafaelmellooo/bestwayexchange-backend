const City = require('../models/City')

module.exports = {
  async index (req, res) {
    try {
      const cities = await City.findAll({
        order: [
          'name'
        ],
        where: {
          countryId: req.params.id
        },
        attributes: ['id', 'name']
      })

      res.status(200).json(cities)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
