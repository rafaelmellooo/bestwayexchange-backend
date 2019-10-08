'use strict'
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    description: DataTypes.TEXT,
    agencyId: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING(2)
  }, {
    timestamps: false
  })
  Address.associate = models => {
    // associations can be defined here
  }
  return Address
}
