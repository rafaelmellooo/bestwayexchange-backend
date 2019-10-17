const { Model, DataTypes } = require('sequelize')

class HousingType extends Model {
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
    this.belongsToMany(models.Exchange, {
      through: models.ExchangeHousingType,
      as: 'exchanges',
      foreignKey: 'housingTypeId'
    })
  }
}

module.exports = HousingType
