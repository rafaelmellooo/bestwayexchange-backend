const User = require('../models/User')

module.exports = {
  async index (req, res) {
    const { agencyId } = req.params

    const employees = await User.findAll({
      where: { agencyId, typeId: 2 },
      attributes: ['name', 'email', 'filename', 'dateOfBirth']
    })

    res.status(200).json(employees)
  }
}
