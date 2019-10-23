const { Model, DataTypes } = require('sequelize')

class Address extends Model {
  static init (sequelize) {
    super.init({
      zipCode: DataTypes.STRING(8),
      street: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      number: DataTypes.NUMBER,
      complement: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate (models) {
    this.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })
  }
}

module.exports = Address
