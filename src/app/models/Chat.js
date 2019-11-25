const { Model } = require('sequelize')

class Chat extends Model {
  static init (sequelize) {
    super.init({ }, {
      sequelize,
      tableName: 'chats',
      updatedAt: false
    })
  }

  static associate (models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })

    this.belongsTo(models.User, {
      as: 'employee',
      foreignKey: 'employeeId'
    })

    this.belongsTo(models.Exchange, {
      as: 'exchange',
      foreignKey: 'exchangeId'
    })

    this.hasMany(models.Message, {
      as: 'messages',
      foreignKey: 'chatId'
    })
  }
}

module.exports = Chat
