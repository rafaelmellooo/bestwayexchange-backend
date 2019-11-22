const Grade = require('../models/Grade')

module.exports = {
  async index (req, res) {
    const grades = await Grade.findAll()

    res.status(200).json(grades)
  }
}
