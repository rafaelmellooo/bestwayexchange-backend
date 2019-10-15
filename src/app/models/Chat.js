'use strict'
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.TEXT,
    exchangeId: {
      type: DataTypes.INTEGER,
      defaultValue: Math.floor((Math.random() * 30) + 1)
    },
    hasViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER
  }, {
    updatedAt: false
  })
  Chat.associate = models => {
    Chat.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'from',
      otherKey: 'to'
    })
  }

  Chat.removeAttribute('id')
  sequelizePaginate.paginate(Chat)
  return Chat
}
