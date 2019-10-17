const { Model } = require('sequelize')

class ExchangeLanguage extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      timestamps: false
    })
  }
}

module.exports = ExchangeLanguage
