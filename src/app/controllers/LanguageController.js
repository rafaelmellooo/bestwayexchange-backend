const Language = require('../models/Language')

module.exports = {
  async index (req, res) {
    const languages = await Language.findAll({
      order: [
        'name'
      ]
    })

    res.status(200).json(languages)
  }
}
