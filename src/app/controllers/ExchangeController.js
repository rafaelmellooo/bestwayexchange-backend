const Exchange = require('../models/Exchange')

module.exports = {
  async index (req, res) {
    const { page = 1, order = 'price', cities, exchangeTypes, languages, housingTypes } = req.query

    const orders = {
      price: ['price'],
      createdAt: ['createdAt', 'DESC'],
      time: ['time']
    }

    const options = {
      page,
      paginate: 10,
      order: [
        orders[order]
      ],
      where: {
        exchangeTypeId: exchangeTypes ? exchangeTypes.split(',') : undefined,
        cityId: cities ? cities.split(',') : undefined
      },
      attributes: ['id', 'name', 'createdAt', 'time', 'description', 'price', 'filename'],
      include: [
        {
          where: {
            id: languages ? languages.split(',') : undefined
          },
          association: 'languages',
          attributes: [],
          through: {
            attributes: []
          }
        },
        {
          where: {
            id: housingTypes ? housingTypes.split(',') : undefined
          },
          association: 'housingTypes',
          attributes: [],
          through: {
            attributes: []
          }
        }
      ]
    }

    Object.keys(options.where).forEach(key => options.where[key] === undefined && delete options.where[key])

    options.include.map(association => {
      Object.keys(association.where).forEach(key => association.where[key] === undefined && delete association.where[key])
    })

    const exchanges = await Exchange.paginate(options)

    res.status(200).json(exchanges)
  },

  async show (req, res) {
    const options = {
      attributes: ['name', 'description', 'filename', 'createdAt', 'price', 'time'],
      include: [
        {
          association: 'housingTypes',
          attributes: ['id', 'name', 'description'],
          through: {
            attributes: []
          }
        },
        {
          association: 'city',
          attributes: ['name'],
          include: {
            association: 'country',
            attributes: ['name', 'description']
          }
        },
        {
          association: 'exchangeType',
          attributes: ['name', 'description']
        },
        {
          association: 'languages',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          association: 'agency',
          attributes: ['id', 'name', 'filename']
        }
      ]
    }

    const exchange = await Exchange.findByPk(req.params.id, options)

    res.status(200).json(exchange)
  },

  async store (req, res) {
    const filename = req.file ? req.file.filename : undefined
    const agency = req.user.agency

    const { languages, housingTypes, name, description, city, price, time, exchangeType } = req.body

    try {
      const exchange = await Exchange.create({
        name,
        description,
        cityId: city,
        price,
        time,
        filename,
        agencyId: agency,
        exchangeTypeId: exchangeType
      })

      await exchange.setLanguages(languages ? languages.split(',') : [])

      await exchange.setHousingTypes(housingTypes ? housingTypes.split(',') : [])

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async update (req, res) {
    const agency = req.user.agency

    const { name, description, city, price, time, exchangeType, languages, housingTypes } = req.body

    try {
      const exchange = await Exchange.update({
        name,
        description,
        cityId: city,
        price,
        time,
        agencyId: agency,
        exchangeTypeId: exchangeType
      }, {
        where: {
          id: req.params.id
        }
      })

      await exchange.setLanguages(languages)

      await exchange.setHousingTypes(housingTypes)

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  },

  async destroy (req, res) {
    try {
      await Exchange.destroy({
        where: {
          id: req.params.id
        }
      })

      res.status(200).json()
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
