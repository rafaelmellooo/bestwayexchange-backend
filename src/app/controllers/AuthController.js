const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const crypto = require('crypto')
const Mail = require('../../lib/Mail')
const path = require('path')
const sequelize = require('sequelize')

module.exports = {
  async register (req, res) {
    const { filename } = req.file
    const { type, agency, name, email, password, dateOfBirth } = req.body

    if (type === 2) {
      if (req.user.type !== 3) { return res.status(401).json() }

      if (agency !== req.user.agency) { return res.status(401).json() }
    }

    try {
      const user = await User.create({
        type, agency, filename, name, password, email, dateOfBirth
      })

      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async authenticate (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      where: {
        email
      },
      attributes: ['id', 'typeId', 'agencyId', 'password', 'isActive']
    })

    if (!user) return res.status(400).json({ error: 'E-mail inválido' })

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Senha inválida' })
    }

    if (!user.isActive) return res.status(401).json()

    const { id, type, agency } = user

    const token = jwt.sign({
      user: {
        id, type, agency
      }
    }, authConfig.secret, {
      expiresIn: 86400
    })

    res.status(200).json({ token })
  },

  async sendEmail (req, res) {
    const { email } = req.body

    const user = await User.findOne({
      attributes: ['id', 'name', [
        sequelize.fn('date_format', sequelize.col('dateOfBirth'), '%d/%m/%Y'), 'dateOfBirth'
      ]],
      include: [
        {
          attributes: ['name'],
          association: 'type'
        }
      ],
      where: { email }
    })

    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

    const token = crypto.randomBytes(20).toString('hex')

    const expiresIn = new Date()
    expiresIn.setHours(expiresIn.getHours() + 1)

    await user.update({ token, expiresIn })

    const { name, dateOfBirth, type } = user

    Mail.sendMail({
      from: 'Best Way Exchange <admin@bestwayexchange.com.br>',
      to: `${name} <${email}>`,
      template: 'send_email',
      context: {
        name,
        dateOfBirth,
        type: type.name
      },
      attachments: [
        {
          filename: 'logo.jpg',
          path: path.resolve(__dirname, '..', 'views', 'emails', 'attachments', 'logo.jpg'),
          cid: 'logo' // same cid value as in the html img src
        }
      ]
    }, err => {
      if (err) { return res.status(400).json('Erro ao enviar e-mail') }

      res.status(200).json()
    })
  },

  async confirmEmail (req, res) {
    const { email, token } = req.body

    const user = await User.findOne({
      where: { email }
    })

    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' })

    if (token !== user.token) return res.status(400).json({ error: 'Autenticação inválida' })

    const now = new Date()

    if (now > user.expiresIn) return res.status(400).json({ error: 'Autenticação expirada, envie outro e-mail de confirmação' })

    await user.update({ isActive: true })

    res.status(200).json()
  }
}
