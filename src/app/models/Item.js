'use strict'
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Item.associate = models => {
    // associations can be defined here
  }
  return Item
}
