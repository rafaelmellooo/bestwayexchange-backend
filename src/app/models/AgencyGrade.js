const { Model } = require('sequelize')

class AgencyGrade extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      updatedAt: false
    })

    this.removeAttribute('id')
  }

  static associate (models) {
    this.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })

    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    this.belongsTo(models.Grade, {
      foreignKey: 'gradeId',
      as: 'grade'
    })
  }
}

module.exports = AgencyGrade
