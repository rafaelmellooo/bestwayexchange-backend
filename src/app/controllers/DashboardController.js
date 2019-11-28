const User = require('../models/User')

module.exports = {
  async show (req, res) {
    const dashboard = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'name', 'filename', 'dateOfBirth'],
      include: [
        {
          association: 'type',
          attributes: ['name']
        },
        {
          association: 'agency',
          attributes: ['name', 'filename']
        }
      ]
    })

    res.status(200).json(dashboard)
  }
}
