'use strict'
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Language.associate = models => {
    // associations can be defined here
  }
  return Language
}
