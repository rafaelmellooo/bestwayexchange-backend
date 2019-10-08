'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExchangeType = sequelize.define('ExchangeType', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false
  })
  ExchangeType.associate = models => {
    // associations can be defined here
  }
  return ExchangeType
}
