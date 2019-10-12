'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExchangeHousingType = sequelize.define('ExchangeHousingType', {
    exchangeId: DataTypes.INTEGER,
    housingTypeId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  ExchangeHousingType.associate = models => {
    ExchangeHousingType.belongsTo(models.Exchange, {
      as: 'exchange',
      foreignKey: 'exchangeId'
    })

    ExchangeHousingType.belongsTo(models.HousingType, {
      as: 'housingType',
      foreignKey: 'housingTypeId'
    })
  }
  return ExchangeHousingType
}
