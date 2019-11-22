const HousingType = require('../models/HousingType')

module.exports = {
  async index (req, res) {
    const housingTypes = await HousingType.findAll({
      order: [
        'name'
      ]
    })

    res.status(200).json(housingTypes)
  }
}
