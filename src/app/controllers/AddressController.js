const Address = require('../models/Address')
const cep = require('cep-promise')

module.exports = {
  async store (req, res) {
    const { zipCode } = req.body

    try {
      const { state, city, neighborhood, street } = await cep(zipCode)

      await Address.create({ zipCode, state, city, neighborhood, street, agencyId: req.user.agency })

      res.status(200).json({ state, city, neighborhood, street })
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    const { number, complement } = req.body

    try {
      await Address.update({ number, complement }, {
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
    await Address.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json()
  }
}
