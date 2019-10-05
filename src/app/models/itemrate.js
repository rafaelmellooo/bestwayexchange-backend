'use strict'
module.exports = (sequelize, DataTypes) => {
  const ItemRate = sequelize.define('ItemRate', {
    itemId: DataTypes.INTEGER,
    exchangeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    gradeId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  ItemRate.associate = models => {
    // associations can be defined here
  }
  return ItemRate
}
