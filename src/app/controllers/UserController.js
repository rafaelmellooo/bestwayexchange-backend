const User = require('../models/User')

module.exports = {
  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['email', 'name'],
        include: [
          {
            association: 'type',
            attributes: ['name']
          }
        ]
      })

      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    try {
      if (req.user.id !== parseInt(req.params.id)) return res.status(401).json()

      if (req.body.typeId || req.body.agencyId || req.body.isActive) return res.status(401).json()

      await User.update(req.body, {
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
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'typeId', 'agencyId']
      })

      if (user.typeId === 2) {
        if (req.user.typeId !== 3) return res.status(401).json()

        if (user.agencyId !== req.user.agencyId) return res.status(401).json()
      } else {
        if (req.user.id !== parseInt(user.id)) return res.status(401).json()
      }

      await User.destroy({
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
