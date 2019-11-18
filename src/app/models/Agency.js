const { Model, DataTypes } = require('sequelize')

class Agency extends Model {
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
      timestamps: false
    })
  }

  static associate (models) {
    this.hasMany(models.User, {
      foreignKey: 'agencyId',
      as: 'users'
    })

    this.belongsToMany(models.User, {
      through: models.AgencyGrade,
      foreignKey: 'agencyId',
      as: 'grades'
    })

    this.hasMany(models.Address, {
      foreignKey: 'agencyId',
      as: 'adresses'
    })
  }
}

module.exports = Agency
