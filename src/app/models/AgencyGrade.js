const { Model } = require('sequelize')

class AgencyGrade extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      updatedAt: false
    })
  }

  static associate (models) {
    this.belongsTo(models.Grade, {
      foreignKey: 'gradeId',
      as: 'grade'
    })
  }
}

module.exports = AgencyGrade
