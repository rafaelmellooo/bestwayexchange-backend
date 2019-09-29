module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    name: DataTypes.STRING
  })

  UserType.associate = models => {
    UserType.hasMany(models.User, {
      foreignKey: 'type'
    })
  }

  return UserType
}
