const Address = require('../models/Address')
const cep = require('cep-promise')

module.exports = {
  async store (req, res) {
    try {
      const { zipCode } = req.body

      const { state, city, neighborhood, street } = await cep(zipCode)

      await Address.create({ zipCode, state, city, neighborhood, street, agencyId: req.params.agencyId })

      res.status(200).json({ state, city, neighborhood, street })
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    try {
      const { number, complement } = req.body

      await Address.update({ number, complement }, {
        where: {
          id: req.params.addressId
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      await Address.destroy({
        where: {
          id: req.params.addressId
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
