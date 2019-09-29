'use strict'
module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define('Agency', {
    name: DataTypes.STRING
  }, {})
  Agency.associate = models => {
    // associations can be defined here
  }

  return Agency
}
