const User = require('../models/User')

module.exports = {
  async update (req, res) {
    const { name, email, password } = req.body

    if (req.user.id !== parseInt(req.params.id)) { return res.status(401).json() }

    try {
      await User.update({
        name, email, password
      }, {
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
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'typeId', 'agencyId']
    })

    if (user.typeId === 2) {
      if (req.user.type !== 3) { return res.status(401).json() }

      if (user.agencyId !== req.user.agency) { return res.status(401).json() }
    } else {
      if (req.user.id !== parseInt(user.id)) { return res.status(401).json() }
    }

    await User.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json()
  }
}
