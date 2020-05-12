'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: {type: DataTypes.STRING,allowNull: false},
    price:{type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    photoUrl: {type: DataTypes.STRING, allowNull: false},
    orderId: {type: DataTypes.INTEGER}
  }, {});
  Product.associate = function(models) {
  Product.belongsTo(models.Order, {as: "order", foreignKey: 'orderId'})
  };
  
  return Product;
};