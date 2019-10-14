'use strict'
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Item.associate = models => {
    Item.belongsToMany(models.Rate, {
      through: models.ItemRate,
      foreignKey: 'itemId',
      as: 'rates'
    })
  }
  return Item
}
