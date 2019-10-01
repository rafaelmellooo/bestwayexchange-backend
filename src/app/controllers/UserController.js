const { User, UserType } = require('../models')

module.exports = {
  async show (req, res) {
    try {
      if (req.userId !== parseInt(req.params.id)) return res.status(401).json()

      const user = await User.findByPk(req.params.id, {
        attributes: ['email', 'name'],
        include: [
          {
            model: UserType,
            as: 'type',
            attributes: ['name']
          }
        ]
      })

      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json(err)
    }
  },

  async update (req, res) {
    try {
      if (req.userId !== parseInt(req.params.id)) return res.status(401).json()

      if (req.body.typeId || req.body.agencyId || req.body.isVerified) return res.status(401).json()

      await User.update(req.body, {
        where: {
          id: req.params.id
        }
      })

      return res.status(200).json()
    } catch (err) {
      return res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      if (req.userId !== parseInt(req.params.id)) return res.status(401).json()

      await User.destroy({
        where: {
          id: req.params.id
        }
      })

      return res.status(200).json()
    } catch (err) {
      return res.status(400).json(err)
    }
  }
}
