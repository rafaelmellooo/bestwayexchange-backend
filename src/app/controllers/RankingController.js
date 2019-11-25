const sequelize = require('sequelize')
const Rate = require('../models/Rate')

module.exports = {
  async show (req, res) {
    const ranking = await Rate.findAll({
      order: [
        [sequelize.literal('COUNT(*) DESC')]
      ],
      limit: 10,
      attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'purchasers'], 'exchangeId'],
      group: ['exchangeId']
    })

    res.status(200).json(ranking)
  }
}
