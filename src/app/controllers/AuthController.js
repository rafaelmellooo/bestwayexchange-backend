const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)

      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
      return res.status(400).json(err)
    }
  },

  async authenticate (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email
      },
      attributes: ['id', 'password']
    })

    if (!user) return res.status(400).json({ error: 'E-mail inválido' })

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Senha inválida' })
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400
    })

    return res.status(200).json({ token })
  }
}
