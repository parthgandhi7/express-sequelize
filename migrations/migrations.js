'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.renameColumn('user', 'address', 'add');
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'address');
  }
};
