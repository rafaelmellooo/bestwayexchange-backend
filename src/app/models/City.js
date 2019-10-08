'use strict'
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    countryId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  City.associate = models => {
    // associations can be defined here
  }
  return City
}
