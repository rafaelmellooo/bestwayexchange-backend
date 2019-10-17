const { Model } = require('sequelize')

class ExchangeHousingType extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      timestamps: false
    })
  }
}

module.exports = ExchangeHousingType
