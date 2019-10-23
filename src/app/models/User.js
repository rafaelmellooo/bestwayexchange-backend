const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init (sequelize) {
    super.init({
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      expiresIn: DataTypes.DATE,
      dateOfBirth: DataTypes.DATEONLY,
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
