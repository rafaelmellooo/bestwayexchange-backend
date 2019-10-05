'use strict'
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    expiresIn: DataTypes.DATE,
    dateOfBirth: DataTypes.DATEONLY,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    typeId: DataTypes.INTEGER,
    agencyId: DataTypes.INTEGER
  }, {
    timestamps: false,
    hooks: {
      beforeCreate: async user => {
        user.password = await bcrypt.hash(user.password, 10)
      }
    }
  })
  User.associate = models => {
    User.belongsTo(models.UserType, {
      foreignKey: 'typeId',
      as: 'type'
    })

    User.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })

    User.belongsToMany(models.Exchange, {
      through: models.Favorite,
      as: 'exchanges',
      foreignKey: 'userId'
    })
  }

  return User
}
