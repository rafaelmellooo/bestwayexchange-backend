const { Model, DataTypes } = require('sequelize')

class Rate extends Model {
  static init (sequelize) {
    super.init({
      comment: {
        type: DataTypes.TEXT('long'),
        validate: {
          notEmpty: {
            msg: 'A descrição não deve ser nula'
          }
        }
      },
      isRated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'rates'
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
