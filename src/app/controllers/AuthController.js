const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const crypto = require('crypto')
const mailer = require('../../services/mailer')

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
      attributes: ['id', 'password', 'isVerified']
    })

    if (!user) return res.status(400).json({ error: 'E-mail inválido' })

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Senha inválida' })
    }

    if (!user.isVerified) return res.status(401).json()

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400
    })

    return res.status(200).json({ token })
  },

  async checkEmail (req, res) {
    try {
      const { email } = req.body

      const token = crypto.randomBytes(20).toString('hex')

      const expiresIn = new Date()
      expiresIn.setHours(expiresIn.getHours() + 1)

      await User.update({ token, expiresIn }, {
        where: { email }
      })

      mailer.sendMail({
        to: email,
        from: 'rafaelmello0715@outlook.com',
        template: 'check_email',
        context: { token }
      }, (err) => {
        console.log(err)
        if (err) return res.status(400).json(err)

        return res.status(200).json()
      })
    } catch (err) {
      console.log(err)
      res.status(400).json(err)
    }
  }
}
