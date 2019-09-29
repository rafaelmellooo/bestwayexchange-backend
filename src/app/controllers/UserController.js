const { User, UserType } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          'id', 'email', 'name'
        ],
        include: [
          {
            model: UserType,
            as: 'type',
            attributes: ['name']
          }
        ]
      })

      return res.status(200).json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  },

  show (req, res) {

  },

  update (req, res) {

  },

  destroy (req, res) {

  }
}
