'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExchangeType = sequelize.define('ExchangeType', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  })
  ExchangeType.associate = models => {
    ExchangeType.hasMany(models.Exchange, {
      as: 'exchanges',
      foreignKey: 'exchangeTypeId'
    })
  }
  return ExchangeType
}
