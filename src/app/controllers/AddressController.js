const Address = require('../models/Address')
const cep = require('cep-promise')

module.exports = {
  async index (req, res) {
    const { agencyId } = req.params

    const addresses = await Address.findAll({
      where: {
        agencyId
      }
    })

    res.status(200).json(addresses)
  },

  async store (req, res) {
    const { zipCode } = req.body

    try {
      const { state, city, neighborhood, street } = await cep(zipCode)

      const address = await Address.create({ zipCode, state, city, neighborhood, street, agencyId: req.user.agency })

      res.status(200).json(address)
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
