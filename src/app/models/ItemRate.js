const { Model } = require('sequelize')

class ItemRate extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      tableName: 'item_rates',
      timestamps: false
    })
  }

  static associate (models) {
    this.belongsTo(models.Rate, {
      as: 'rate',
      foreignKey: 'rateId'
    })

    this.belongsTo(models.Item, {
      as: 'item',
      foreignKey: 'itemId'
    })

    this.belongsTo(models.Grade, {
      as: 'grade',
      foreignKey: 'gradeId'
    })
  }
}

module.exports = ItemRate
