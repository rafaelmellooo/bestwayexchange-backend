const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init (sequelize) {
    super.init({
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'E-mail já cadastrado no sistema'
        },
        validate: {
          notEmpty: {
            msg: 'O e-mail não deve ser nulo'
          },
          isEmail: {
            msg: 'E-mail informado está no formato inválido'
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'O nome não deve ser nulo'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'A senha não deve ser nula'
          },
          len: {
            args: [7, 42],
            msg: 'A senha deve conter entre 7 e 42 caracteres'
          }
        }
      },
      token: DataTypes.STRING,
      expiresIn: DataTypes.DATE,
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            msg: 'Formato de data inválido'
          }
        }
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      timestamps: false,
      hooks: {
        beforeCreate: async user => {
          user.password = await bcrypt.hash(user.password, 10)
        }
      }
    })
  }

  static associate (models) {
    this.belongsTo(models.UserType, {
      foreignKey: 'typeId',
      as: 'type'
    })

    this.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })

    this.hasMany(models.Favorite, {
      as: 'favorites',
      foreignKey: 'userId'
    })

    this.hasMany(models.Rate, {
      as: 'rates',
      foreignKey: 'userId'
    })

    this.hasMany(models.Chat, {
      as: 'messages',
      foreignKey: 'from',
      otherKey: 'to'
    })

    this.belongsToMany(models.Agency, {
      through: models.AgencyGrade,
      foreignKey: 'userId',
      as: 'agencies'
    })
  }
}

module.exports = User
