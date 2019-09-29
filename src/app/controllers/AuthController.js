const User = require('../models/User')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const authConfig = require('../../config/auth')

module.exports = {
  async register (req, res) {
    // const { password, ...data } = req.body

    // const hash = await bcrypt.hash(password, 10)

    try {
      const user = await User.create({
        name: 'Rafael de Mello e Sousa',
        email: 'rafael@outlook.com',
        password: 123,
        token: 'n8904en44h5h4h945',
        expirationDate: '2019-09-29 03:43:08',
        dateOfBirth: '2001-07-15',
        type: 1
      })

      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json(err)
    }
  },

  authenticate (req, res) {
    // const { email, password } = req.body

    // mysql.query(
    //   'SELECT cd_usuario, nm_senha FROM usuario WHERE nm_email = ?',
    //   [email],
    //   async (err, data) => {
    //     if (err) return res.status(500).json(err)

    //     if (data.length === 0) {
    //       return res.status(400).json({ error: 'User not found' })
    //     }

    //     if (!(await bcrypt.compare(password, data[0].nm_senha))) {
    //       return res.status(400).json({ error: 'Invalid password' })
    //     }

    //     const token = jwt.sign({ id: data[0].cd_usuario }, authConfig.secret, {
    //       expiresIn: 86400
    //     })

    //     return res.json({ token })
    //   }
    // )
  }
}
