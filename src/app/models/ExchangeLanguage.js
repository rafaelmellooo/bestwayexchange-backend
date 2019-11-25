const { Model } = require('sequelize')

class ExchangeLanguage extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      tableName: 'exchange_languages',
      timestamps: false
    })
  }
}

module.exports = ExchangeLanguage
