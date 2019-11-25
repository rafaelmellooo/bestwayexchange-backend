const { Model, DataTypes } = require('sequelize')

class City extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'O nome não deve ser nulo'
          }
        }
      }
    }, {
      sequelize,
      tableName: 'cities',
      timestamps: false
    })
  }

  static associate (models) {
    this.hasMany(models.Exchange, {
      as: 'exchanges',
      foreignKey: 'cityId'
    })

    this.belongsTo(models.Country, {
      as: 'country',
      foreignKey: 'countryId'
    })
  }
}

module.exports = City
