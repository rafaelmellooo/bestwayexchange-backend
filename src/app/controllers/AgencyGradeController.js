const AgencyGrade = require('../models/AgencyGrade')

module.exports = {
  async index (req, res) {
    const { agencyId } = req.params

    const grades = await AgencyGrade.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      where: {
        agencyId
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
  },

  async store (req, res) {
    const { agencyId } = req.params
    const userId = req.user.id
    const { gradeId } = req.body

    await AgencyGrade.create({
      agencyId, userId, gradeId
    })

    res.status(200).json()
  },

  async destroy (req, res) {
    const { agencyId } = req.params
    const userId = req.user.id

    await AgencyGrade.destroy({
      where: {
        agencyId, userId
      }
    })

    res.status(200).json()
  }
}
