module.exports = function (sequelize, DataTypes) {
  let images = sequelize.define('Image', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.BLOB("long")
    }
  });
  return images;
};