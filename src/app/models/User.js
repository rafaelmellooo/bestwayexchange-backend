module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    expiresIn: DataTypes.DATE,
    dateOfBirth: DataTypes.DATEONLY,
    type: DataTypes.INTEGER
  })

  User.associate = models => {
    User.belongsTo(models.UserType, {
      as: 'type',
      foreignKey: 'type'
    })
  }

  return User
}
