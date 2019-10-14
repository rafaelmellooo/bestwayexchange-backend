'use strict'
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Language.associate = models => {
    Language.belongsToMany(models.Exchange, {
      through: models.ExchangeLanguage,
      as: 'exchanges',
      foreignKey: 'languageId'
    })
  }
  return Language
}
