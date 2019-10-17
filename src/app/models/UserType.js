const { Model, DataTypes } = require('sequelize')

class UserType extends Model {
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
      foreignKey: 'typeId',
      as: 'users'
    })
  }
}

module.exports = UserType
