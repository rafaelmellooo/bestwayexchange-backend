const { Agency, UserAgency } = require('../models')
const sequelize = require('sequelize')

module.exports = {
  async show (req, res) {
    try {
      const agency = await Agency.findByPk(req.params.id, {
        attributes: ['name'],
        include: [
          {
            model: UserAgency,
            as: 'grades',
            attributes: [[
              sequelize.fn('AVG', sequelize.col('gradeId')), 'avg'
            ]]
          }
        ]
      })

      res.status(200).json(agency)
    } catch (err) {
      console.log(err)
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
