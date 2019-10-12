'use strict'
module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define('Exchange', {
    description: DataTypes.TEXT,
    name: DataTypes.STRING,
    languageId: DataTypes.INTEGER,
    exchangeTypeId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER,
    agencyId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  Exchange.associate = models => {
    Exchange.belongsToMany(models.User, {
      through: models.Favorite,
      as: 'users',
      foreignKey: 'exchangeId'
    })

    Exchange.hasMany(models.Rate, {
      as: 'rates',
      foreignKey: 'exchangeId'
    })

    Exchange.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    })

    Exchange.belongsTo(models.ExchangeType, {
      as: 'exchangeType',
      foreignKey: 'exchangeTypeId'
    })

    Exchange.belongsTo(models.City, {
      as: 'city',
      foreignKey: 'cityId',
      otherKey: 'countryId'
    })

    Exchange.belongsToMany(models.HousingType, {
      through: models.ExchangeHousingType,
      as: 'housingTypes',
      foreignKey: 'exchangeId'
    })
  }
  return Exchange
}
