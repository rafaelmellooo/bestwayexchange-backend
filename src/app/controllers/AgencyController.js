const Agency = require('../models/Agency')
const AgencyGrade = require('../models/AgencyGrade')
const sequelize = require('sequelize')

module.exports = {
  async show (req, res) {
    try {
      const agency = await Agency.findByPk(req.params.id, {
        order: [
          'name'
        ],
        attributes: ['name'],
        include: [
          {
            association: 'adresses',
            attributes: ['zipCode', 'street', 'neighborhood', 'number', 'complement', 'city', 'state']
          }
        ]
      })

      const grades = await AgencyGrade.findAll({
        where: {
          agencyId: req.params.id
        },
        attributes: [[sequelize.fn('AVG', sequelize.col('gradeId')), 'avg']]
      })

      res.status(200).json({ agency, grades })
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { filename } = req.file

      await Agency.create({ ...req.body, filename })

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
