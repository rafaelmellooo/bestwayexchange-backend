module.exports = (sequelize, DataTypes) => {
  const Agency = sequelize.define('Agency', {
    name: DataTypes.STRING
  })

  return Agency
}
