'use strict'
module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define('Agency', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Agency.associate = models => {
    Agency.hasMany(models.User, {
      foreignKey: 'agencyId',
      as: 'users'
    })
  }

  return Agency
}
