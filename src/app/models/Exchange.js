const { Model, DataTypes } = require('sequelize')

class Exchange extends Model {
  static init (sequelize) {
    super.init({
      description: DataTypes.TEXT,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER
    }, {
      sequelize,
      updatedAt: false
    })

    require('sequelize-paginate').paginate(this)
  }

  static associate (models) {
    this.hasMany(models.Favorite, {
      as: 'favorites',
      foreignKey: 'exchangeId'
    })

    this.hasMany(models.Rate, {
      as: 'rates',
      foreignKey: 'exchangeId'
    })

    this.belongsTo(models.ExchangeType, {
      as: 'exchangeType',
      foreignKey: 'exchangeTypeId'
    })

    this.belongsTo(models.City, {
      as: 'city',
      foreignKey: 'cityId'
    })

    this.belongsToMany(models.HousingType, {
      through: models.ExchangeHousingType,
      as: 'housingTypes',
      foreignKey: 'exchangeId'
    })

    this.belongsToMany(models.Language, {
      through: models.ExchangeLanguage,
      as: 'languages',
      foreignKey: 'exchangeId'
    })

    this.hasMany(models.Chat, {
      as: 'chats',
      foreignKey: 'exchangeId'
    })
  }
}

module.exports = Exchange
