'use strict'
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Grade.associate = models => {
    Grade.hasMany(models.UserAgency, {
      foreignKey: 'gradeId',
      as: 'agencies'
    })
  }
  return Grade
}
