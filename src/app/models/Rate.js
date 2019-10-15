'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    exchangeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT('long')
  }, {})
  Rate.associate = models => {
    Rate.belongsTo(models.Exchange, {
      foreignKey: 'exchangeId',
      as: 'exchanges'
    })

    Rate.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    })

    Rate.belongsToMany(models.Item, {
      through: models.ItemRate,
      as: 'items',
      foreignKey: 'rateId'
    })
  }

  return Rate
}
