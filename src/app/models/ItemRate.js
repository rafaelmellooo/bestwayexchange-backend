'use strict'
module.exports = (sequelize, DataTypes) => {
  const ItemRate = sequelize.define('ItemRate', {
    rateId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    gradeId: DataTypes.INTEGER
  }, {
    timestamps: false
  })
  ItemRate.associate = models => {
    ItemRate.belongsTo(models.Rate, {
      as: 'rate',
      foreignKey: 'rateId'
    })

    ItemRate.belongsTo(models.Item, {
      as: 'item',
      foreignKey: 'itemId'
    })

    ItemRate.belongsTo(models.Grade, {
      as: 'grade',
      foreignKey: 'gradeId'
    })
  }

  return ItemRate
}
