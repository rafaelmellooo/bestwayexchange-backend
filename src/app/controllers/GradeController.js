const { Grade } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const grades = await Grade.findAll()

      res.status(200).json(grades)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
