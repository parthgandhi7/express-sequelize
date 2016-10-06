'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('user', 'add', Sequelize.STRING);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'add');
  }
};
