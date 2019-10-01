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
  }
  return Exchange
}
