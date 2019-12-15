module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique:true
        },
        password: {
            type: DataTypes.STRING
        },
        forgotecodes: {
            type: DataTypes.INTEGER
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthDay: {
            type: DataTypes.STRING,
             allowNull: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },

    }, {
        tableName: 'user',
        timestamps: false
    });
    return User
};
