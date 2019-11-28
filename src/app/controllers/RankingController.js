const sequelize = require('sequelize')
const Rate = require('../models/Rate')

module.exports = {
  async show (req, res) {
    const { limit } = req.query

    const ranking = await Rate.findAll({
      order: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'DESC']
      ],
      limit: Number(limit),
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'purchasers'], 'exchangeId'],
      group: ['exchangeId'],
      include: [
        {
          association: 'exchanges',
          attributes: ['name', 'filename', 'time', 'price'],
          include: [
            {
              association: 'exchangeType',
              attributes: ['name']
            },
            {
              association: 'city',
              attributes: ['name'],
              include: [
                {
                  association: 'country',
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ]
    })

    res.status(200).json(ranking)
  }
}
