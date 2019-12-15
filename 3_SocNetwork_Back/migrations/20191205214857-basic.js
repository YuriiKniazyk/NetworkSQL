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
                type: Sequelize.STRING,
                unique:true
            },
            password: {
                type: Sequelize.STRING
            },
            forgotecodes: {
                type: Sequelize.INTEGER
            }
        };
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
        };
        await queryInterface.createTable('friend', friendTables);

        const photoTable = {
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
            path: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        };
        await queryInterface.createTable('photo', photoTable);
    },

    down: async(queryInterface) => {
        await queryInterface.dropTable('friend');
        await queryInterface.dropTable('photo');
        await queryInterface.dropTable('user');
    }
};