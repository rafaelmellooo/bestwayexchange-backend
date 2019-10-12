'use strict'
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  })
  Country.associate = models => {
    Country.hasMany(models.City, {
      as: 'cities',
      foreignKey: 'countryId'
    })
  }
  return Country
}
