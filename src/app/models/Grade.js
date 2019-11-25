const { Model, DataTypes } = require('sequelize')

class Grade extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'grades',
      timestamps: false
    })
  }

  static associate (models) {
    this.hasMany(models.AgencyGrade, {
      foreignKey: 'gradeId',
      as: 'agencies'
    })

    this.hasMany(models.ItemRate, {
      foreignKey: 'gradeId',
      as: 'rates'
    })
  }
}

module.exports = Grade
