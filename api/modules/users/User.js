"use strict"
const Sequelize = require('sequelize');
const sequelize = exp.sequelize;
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

var userAddressAssociation = User.belongsTo(exp.models.Addresses, { foreignKey: 'address_id', as: 'address' });

// User.sync({force: true});
global.exp.associations.userAddress = userAddressAssociation;
global.exp.models.Users = User;
