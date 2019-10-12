'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserAgency = sequelize.define('UserAgency', {
    gradeId: DataTypes.INTEGER,
    agencyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  UserAgency.associate = models => {
    UserAgency.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })

    UserAgency.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    UserAgency.belongsTo(models.Grade, {
      foreignKey: 'gradeId',
      as: 'grade'
    })
  }

  UserAgency.removeAttribute('id')
  return UserAgency
}
