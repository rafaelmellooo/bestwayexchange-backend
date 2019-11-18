const { Model, DataTypes } = require('sequelize')

class Message extends Model {
  static init (sequelize) {
    super.init({
      body: DataTypes.TEXT('long'),
      filename: DataTypes.STRING,
      isVisualized: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      sequelize,
      updatedAt: false
    })

    this.removeAttribute('id')
  }

  static associate (models) {
    this.belongsTo(models.Chat, {
      as: 'chat',
      foreignKey: 'chatId'
    })

    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'from'
    })
  }
}

module.exports = Message
