const { Model, DataTypes } = require('sequelize')

class Language extends Model {
  static init (sequelize) {
    super.init({
      name: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate (models) {
    this.belongsToMany(models.Exchange, {
      through: models.ExchangeLanguage,
      as: 'exchanges',
      foreignKey: 'languageId'
    })
  }
}

module.exports = Language
