const { Agency } = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const agency = Agency.findByPk(req.params.id)

      res.status(200).json(agency)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      await Agency.create(req.body)

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    try {
      await Agency.update(req.body, {
        where: {
          id: req.params.id
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      await Agency.destroy({
        where: {
          id: req.params.id
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
