'use strict'
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.INTEGER,
    exchangeId: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  Favorite.associate = models => {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    Favorite.belongsTo(models.Exchange, {
      foreignKey: 'exchangeId',
      as: 'exchange'
    })
  }
  return Favorite
}
