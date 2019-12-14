module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'photo',
        timestamps: false
    });

    const User = sequelize.import('./user.js');
    Photo.belongsTo(User, {foreignKey: 'user_id'});

    return Photo
};
