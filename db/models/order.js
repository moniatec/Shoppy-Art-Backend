'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER, allowNull: false
  }, {});
  Order.associate = function(models) {
   Order.belongsTo(models.User, {foreignKey: 'userId'})

  Order.hasMany(models.Product, {
    foreignKey: "orderId",
  });
};
  return Order;
};