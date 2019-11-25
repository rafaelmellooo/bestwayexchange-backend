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
      tableName: 'messages',
      updatedAt: false
    })

    this.removeAttribute('id')
    require('sequelize-paginate').paginate(this)
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
