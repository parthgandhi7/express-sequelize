'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
      'address', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        line1: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING
      }
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('address');
  }
};
