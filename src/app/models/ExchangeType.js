const { Model, DataTypes } = require('sequelize')

class ExchangeType extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.TEXT
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate (models) {
    this.hasMany(models.Exchange, {
      as: 'exchanges',
      foreignKey: 'exchangeTypeId'
    })
  }
}

module.exports = ExchangeType
