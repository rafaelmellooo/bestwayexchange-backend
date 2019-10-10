const { Language } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const languages = await Language.findAll()

      res.status(200).json(languages)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
