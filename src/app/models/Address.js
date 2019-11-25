const { Model, DataTypes } = require('sequelize')

class Address extends Model {
  static init (sequelize) {
    super.init({
      zipCode: {
        type: DataTypes.STRING(8),
        validate: {
          notEmpty: {
            msg: 'O CEP não deve ser nulo'
          }
        }
      },
      street: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      number: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'O número não deve ser nulo'
          },
          isInt: {
            msg: 'O número deve ser numérico'
          }
        }
      },
      complement: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'addresses',
      timestamps: false
    })
  }

  static associate (models) {
    this.belongsTo(models.Agency, {
      foreignKey: 'agencyId',
      as: 'agency'
    })
  }
}

module.exports = Address
