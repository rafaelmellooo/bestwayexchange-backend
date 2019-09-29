'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  UserType.associate = models => {
    UserType.hasMany(models.User, {
      foreignKey: 'typeId',
      as: 'users'
    })
  }

  return UserType
}
