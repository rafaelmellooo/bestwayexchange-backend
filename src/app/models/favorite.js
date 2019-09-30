'use strict'
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    exchangeId: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  Favorite.associate = models => {
    // associations can be defined here
  }
  return Favorite
}
