'use strict'
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  })
  Country.associate = models => {
    // associations can be defined here
  }
  return Country
}
