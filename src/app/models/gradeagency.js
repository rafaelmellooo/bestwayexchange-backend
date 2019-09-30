'use strict'
module.exports = (sequelize, DataTypes) => {
  const GradeAgency = sequelize.define('GradeAgency', {
    gradeId: DataTypes.INTEGER,
    agencyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  GradeAgency.associate = models => {
    // associations can be defined here
  }
  return GradeAgency
}
