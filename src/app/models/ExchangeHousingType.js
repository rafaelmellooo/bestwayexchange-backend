const { Model } = require('sequelize')

class ExchangeHousingType extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      tableName: 'exchange_housing_types',
      timestamps: false
    })
  }
}

module.exports = ExchangeHousingType
