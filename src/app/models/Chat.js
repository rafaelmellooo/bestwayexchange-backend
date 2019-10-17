const { Model, DataTypes } = require('sequelize')

class Chat extends Model {
  static init (sequelize) {
    super.init({
      message: DataTypes.TEXT,
      hasViewed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      updatedAt: false
    })

    this.removeAttribute('id')
    require('sequelize-paginate').paginate(this)
  }

  static associate (models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'from',
      otherKey: 'to'
    })

    this.belongsTo(models.Exchange, {
      as: 'exchange',
      foreignKey: 'exchangeId'
    })
  }
}

module.exports = Chat
