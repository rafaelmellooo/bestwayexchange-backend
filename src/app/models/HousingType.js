'use strict'
module.exports = (sequelize, DataTypes) => {
  const HousingType = sequelize.define('HousingType', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  })
  HousingType.associate = models => {
    // associations can be defined here
  }
  return HousingType
}
