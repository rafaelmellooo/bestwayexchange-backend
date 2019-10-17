const { Model } = require('sequelize')

class Favorite extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      updatedAt: false
    })

    this.removeAttribute('id')
  }

  static associate (models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    this.belongsTo(models.Exchange, {
      foreignKey: 'exchangeId',
      as: 'exchange'
    })
  }
}

module.exports = Favorite
