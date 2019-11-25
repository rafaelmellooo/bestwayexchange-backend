const { Model, DataTypes } = require('sequelize')

class Country extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'O nome não deve ser nulo'
          }
        }
      },
      description: DataTypes.TEXT,
      filename: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'countries',
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
