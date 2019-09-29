'use strict'
const bcrypt = require('bcryptjs/hash')

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
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.password = bcrypt.hash(user.password, 10)
      }
    }
  })
  User.associate = models => {
    // associations can be defined here
  }

  return User
}
