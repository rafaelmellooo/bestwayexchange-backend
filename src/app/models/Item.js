const { Model, DataTypes } = require('sequelize')

class Item extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate (models) {
    this.belongsToMany(models.Rate, {
      through: models.ItemRate,
      foreignKey: 'itemId',
      as: 'rates'
    })
  }
}

module.exports = Item
