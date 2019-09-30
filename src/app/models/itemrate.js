'use strict'
module.exports = (sequelize, DataTypes) => {
  const ItemRate = sequelize.define('ItemRate', {
    itemId: DataTypes.INTEGER,
    rateId: DataTypes.INTEGER,
    gradeId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  ItemRate.associate = models => {
    // associations can be defined here
  }
  return ItemRate
}
