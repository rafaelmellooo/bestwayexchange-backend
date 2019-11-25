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
      },
      description: {
        type: DataTypes.TEXT('long'),
        validate: {
          notEmpty: {
            msg: 'A descrição não deve ser nula'
          }
        }
      },
      filename: DataTypes.STRING,
      background: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'agencies',
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

    this.hasMany(models.Exchange, {
      as: 'exchanges',
      foreignKey: 'agencyId'
    })
  }
}

module.exports = Agency
