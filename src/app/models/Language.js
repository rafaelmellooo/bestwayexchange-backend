'use strict'
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Language.associate = models => {
    Language.hasMany(models.Exchange, {
      as: 'exchanges'
    })
  }
  return Language
}
