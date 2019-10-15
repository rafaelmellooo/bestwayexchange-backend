'use strict'
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Grade.associate = models => {
    Grade.hasMany(models.AgencyGrade, {
      foreignKey: 'gradeId',
      as: 'agencies'
    })

    Grade.hasMany(models.ItemRate, {
      foreignKey: 'gradeId',
      as: 'rates'
    })
  }
  return Grade
}
