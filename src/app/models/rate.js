'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    exchangeId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  Rate.associate = models => {
    // associations can be defined here
  }
  return Rate
}
