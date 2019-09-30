'use strict'
module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    name: DataTypes.STRING
  }, {
    timestamps: false
  })
  Grade.associate = models => {
    // associations can be defined here
  }
  return Grade
}
