'use strict'
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    countryId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  City.associate = models => {
    City.hasMany(models.Exchange, {
      as: 'exchanges',
      foreignKey: 'cityId',
      otherKey: 'countryId'
    })
  }
  return City
}
