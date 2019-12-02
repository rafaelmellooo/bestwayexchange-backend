const Agency = require('../models/Agency')
const User = require('../models/User')
const AgencyGrade = require('../models/AgencyGrade')
const sequelize = require('sequelize')

module.exports = {
  async show (req, res) {
    const agency = await Agency.findByPk(req.params.id, {
      attributes: ['name', 'description', 'filename', 'background'],
      include: [
        {
          association: 'exchanges',
          attributes: ['id', 'name', 'filename', 'createdAt', 'time', 'price'],
          include: [
            {
              association: 'exchangeType',
              attributes: ['name']
            },
            {
              association: 'city',
              attributes: ['name'],
              include: [
                {
                  association: 'country',
                  attributes: ['name']
                }
              ]
            }
          ]
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
    const filename = req.file ? req.file.filename : undefined
    const { name, description, background } = req.body

    try {
      const agency = await Agency.create({ name, description, background, filename })

      await User.update({
        agencyId: agency.id
      }, {
        where: {
          id: req.user.id
        }
      })

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
