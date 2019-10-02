'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserAgency = sequelize.define('UserAgency', {
    gradeId: DataTypes.INTEGER,
    agencyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {})
  UserAgency.associate = models => {
    // associations can be defined here
  }
  return UserAgency
}
