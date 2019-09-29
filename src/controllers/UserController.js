const mysql = require('../config/mysql')

module.exports = {
  index (req, res) {
    mysql.query('SELECT * FROM usuario', (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
  },

  show (req, res) {
    mysql.query('SELECT * FROM usuario WHERE cd_usuario = ?', [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(data)
    })
  },

  update (req, res) {

  },

  destroy (req, res) {

  }
}
