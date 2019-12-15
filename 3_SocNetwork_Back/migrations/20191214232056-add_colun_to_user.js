'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
          'user',
          'birthDay',
            {
              type: Sequelize.STRING,
            }
        ),
      queryInterface.addColumn(
          'user',
          'city',
          {
            type: Sequelize.STRING,
          }
      ),
      queryInterface.addColumn(
          'user',
          'photo',
          {
            type: Sequelize.STRING,
          }
      ),
      queryInterface.addColumn(
          'user',
          'created_at',
          {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
          'user',
          'birthDay',
          {
            type: Sequelize.STRING,
          }
      ),
      queryInterface.removeColumn(
          'user',
          'city',
          {
            type: Sequelize.STRING,
          }
      ),
      queryInterface.removeColumn(
          'user',
          'photo',
          {
            type: Sequelize.STRING,
          }
      ),
      queryInterface.removeColumn(
          'user',
          'created_at',
          {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          }
      )
    ]);
  }
};
