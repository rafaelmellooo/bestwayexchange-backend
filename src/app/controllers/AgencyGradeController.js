const AgencyGrade = require('../models/AgencyGrade')

module.exports = {
  async index (req, res) {
    try {
      const grades = await AgencyGrade.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        where: {
          agencyId: req.params.id
        },
        attributes: ['createdAt'],
        include: [
          {
            association: 'user',
            attributes: ['email', 'name']
          },
          {
            association: 'grade',
            attributes: ['id', 'name']
          }
        ]
      })

      res.status(200).json(grades)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async store (req, res) {
    try {
      const { params, user, body } = req
      const { gradeId } = body
      const { id: agencyId } = params
      const { id: userId } = user

      await AgencyGrade.create({
        agencyId, userId, gradeId
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      const { params, user } = req
      const { id: agencyId } = params
      const { id: userId } = user

      await AgencyGrade.destroy({
        where: {
          agencyId, userId
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
