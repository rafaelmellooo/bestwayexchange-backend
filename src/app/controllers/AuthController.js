const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const crypto = require('crypto')
const mailer = require('../../services/mailer')
const { resolve } = require('path')
const sequelize = require('sequelize')

module.exports = {
  async register (req, res) {
    try {
      const { typeId, agencyId, ...data } = req.body

      if (typeId === 2) {
        if (req.user.typeId !== 3) return res.status(401).json()

        if (agencyId !== req.user.agencyId) return res.status(401).json()
      }

      const user = await User.create({ typeId, agencyId, ...data })

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

    const { id, typeId, agencyId } = user

    const token = jwt.sign({
      user: {
        id, typeId, agencyId
      }
    }, authConfig.secret, {
      expiresIn: 86400
    })

    res.status(200).json({ token })
  },

  async sendEmail (req, res) {
    try {
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

      if (!user) return res.status(400).json({ error: 'User not found' })

      const token = crypto.randomBytes(20).toString('hex')

      const expiresIn = new Date()
      expiresIn.setHours(expiresIn.getHours() + 1)

      await user.update({ token, expiresIn })

      const { name, dateOfBirth, type } = user

      mailer.sendMail({
        to: email,
        from: 'rafaelmello0715@outlook.com',
        template: 'send_email',
        context: {
          name,
          dateOfBirth,
          type: type.name
        },
        attachments: [
          {
            filename: 'logo.jpg',
            path: resolve(__dirname, '..', '..', 'templates', 'mail', 'attachments', 'logo.jpg'),
            cid: 'logo' // same cid value as in the html img src
          }
        ]
      }, err => {
        if (err) return res.status(400).json(err)

        res.status(200).json()
      })
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async confirmEmail (req, res) {
    try {
      const { email, token } = req.body

      const user = await User.findOne({
        where: { email }
      })

      if (!user) return res.status(400).json({ error: 'User not found' })

      if (token !== user.token) return res.status(400).json({ error: 'Token invalid' })

      const now = new Date()

      if (now > user.expiresIn) return res.status(400).json({ error: 'Token expired, generate a new one' })

      await user.update({ isActive: true })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
