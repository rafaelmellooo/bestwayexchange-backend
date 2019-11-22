const City = require('../models/City')

module.exports = {
  async index (req, res) {
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
  }
}
