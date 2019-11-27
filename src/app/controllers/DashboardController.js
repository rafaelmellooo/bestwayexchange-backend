const User = require('../models/User')

module.exports = {
  async show (req, res) {
    const user = await User.findByPk(req.user.id, {
      attributes: ['email', 'name', 'filename', 'dateOfBirth'],
      include: [
        {
          association: 'type',
          attributes: ['name']
        },
        {
          association: 'agency',
          attributes: ['id', 'name', 'filename']
        }
      ]
    })

    res.status(200).json(user)
  }
}
