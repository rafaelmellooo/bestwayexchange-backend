'use strict'
module.exports = (sequelize, DataTypes) => {
  const AgencyGrade = sequelize.define('AgencyGrade', {
    gradeId: DataTypes.INTEGER,
    agencyId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  AgencyGrade.associate = function (models) {
    AgencyGrade.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })

    AgencyGrade.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    AgencyGrade.belongsTo(models.Grade, {
      foreignKey: 'gradeId',
      as: 'grade'
    })
  }

  AgencyGrade.removeAttribute('id')
  return AgencyGrade
}
