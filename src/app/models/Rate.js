const { Model, DataTypes } = require('sequelize')

class Rate extends Model {
  static init (sequelize) {
    super.init({
      description: DataTypes.TEXT('long'),
      hasRated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      createdAt: false
    })

    require('sequelize-paginate').paginate(this)
  }

  static associate (models) {
    this.belongsTo(models.Exchange, {
      foreignKey: 'exchangeId',
      as: 'exchanges'
    })

    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users'
    })

    this.belongsToMany(models.Item, {
      through: models.ItemRate,
      as: 'items',
      foreignKey: 'rateId'
    })
  }
}

module.exports = Rate
