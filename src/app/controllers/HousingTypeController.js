const { HousingType } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const housingTypes = await HousingType.findAll({
        order: [
          'name'
        ]
      })

      res.status(200).json(housingTypes)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
