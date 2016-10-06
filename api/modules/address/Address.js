"use strict"
const Sequelize = require('sequelize');
const sequelize = exp.sequelize;
const Address = sequelize.define('address', {
  line1: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


// Address.sync({force: true})

global.exp.models.Addresses = Address;
