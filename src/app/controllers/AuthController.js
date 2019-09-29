const User = require('../models/User')
// const jwt = require('jsonwebtoken')
// const authConfig = require('../../config/auth')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)

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
