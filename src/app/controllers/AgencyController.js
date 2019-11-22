const Agency = require('../models/Agency')
const AgencyGrade = require('../models/AgencyGrade')
const sequelize = require('sequelize')

module.exports = {
  async show (req, res) {
    const agency = await Agency.findByPk(req.params.id, {
      order: [
        'name'
      ],
      attributes: ['name, description, filename, background'],
      include: [
        {
          association: 'adresses',
          attributes: ['zipCode', 'street', 'neighborhood', 'number', 'complement', 'city', 'state']
        }
      ]
    })

    const rate = await AgencyGrade.findAll({
      where: {
        agencyId: req.params.id
      },
      attributes: [[sequelize.fn('AVG', sequelize.col('gradeId')), 'avg']]
    })

    res.status(200).json({ agency, rate })
  },

  async store (req, res) {
    const { filename } = req.file
    const { name, description, background } = req.body

    try {
      await Agency.create({ name, description, background, filename })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    const { name, description } = req.body

    try {
      await Agency.update({ name, description }, {
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
    await Agency.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json()
  }
}
