const City = require('../models/City')

module.exports = {
  async index (req, res) {
    const { countryId } = req.params

    const cities = await City.findAll({
      order: [
        'name'
      ],
      where: {
        countryId
      },
      attributes: ['id', 'name']
    })

    res.status(200).json(cities)
  },

  async store (req, res) {
    const { countryId } = req.params
    const { name } = req.body

    try {
      await City.create({ name, countryId })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
