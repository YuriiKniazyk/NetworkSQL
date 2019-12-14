'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      name: 'Yurii',
      surname: 'Kniazyk',
      email: 'demo@demo.com',
      password: 'b59c67bf196a4758191e42f76670ceba'  //1111
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
