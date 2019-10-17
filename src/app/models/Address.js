const { Model, DataTypes } = require('sequelize')

class Address extends Model {
  static init (sequelize) {
    super.init({
      description: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING(2)
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate (models) { }
}

module.exports = Address
