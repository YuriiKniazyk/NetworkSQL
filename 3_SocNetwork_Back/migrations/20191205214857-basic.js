'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const usersTable = {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
            },
            surname: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            forgotecodes: {
                type: Sequelize.INTEGER
            }
        }
        await queryInterface.createTable('user', usersTable);

        const friendTables = {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                references: {
                    model: 'user',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            friend_id: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                references: {
                    model: 'user',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        }
        await queryInterface.createTable('friend', friendTables);
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('friend');
        await queryInterface.dropTable('user');
    }
};