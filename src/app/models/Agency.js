const { Model, DataTypes } = require('sequelize')

class Agency extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate (models) {
    this.hasMany(models.User, {
      foreignKey: 'agencyId',
      as: 'users'
    })

    this.hasMany(models.AgencyGrade, {
      foreignKey: 'agencyId',
      as: 'grades'
    })
  }
}

module.exports = Agency
