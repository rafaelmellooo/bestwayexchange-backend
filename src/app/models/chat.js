'use strict'
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.TEXT,
    exchangeId: DataTypes.INTEGER,
    hasViewed: DataTypes.BOOLEAN,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  Chat.associate = models => {
    // associations can be defined here
  }
  return Chat
}
