const { Model, DataTypes } = require('sequelize')

class Country extends Model {
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
    this.hasMany(models.City, {
      as: 'cities',
      foreignKey: 'countryId'
    })
  }
}

module.exports = Country
