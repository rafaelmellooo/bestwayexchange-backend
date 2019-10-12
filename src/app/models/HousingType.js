'use strict'
module.exports = (sequelize, DataTypes) => {
  const HousingType = sequelize.define('HousingType', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  })
  HousingType.associate = models => {
    HousingType.belongsToMany(models.Exchange, {
      through: models.ExchangeHousingType,
      as: 'exchanges',
      foreignKey: 'housingTypeId'
    })
  }
  return HousingType
}
