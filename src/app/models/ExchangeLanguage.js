'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExchangeLanguage = sequelize.define('ExchangeLanguage', {
    exchangeId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  ExchangeLanguage.associate = models => {
    ExchangeLanguage.belongsTo(models.Exchange, {
      as: 'exchange',
      foreignKey: 'exchangeId'
    })

    ExchangeLanguage.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    })
  }
  return ExchangeLanguage
}
