module.exports = function (sequelize, DataType) {
    var User = sequelize.define('User', {
        name: DataType.STRING,

    }, {
            timestamps: false,
        });

    User.associate = function (models) {
        User.hasOne(models.Inventory, {
            onDelete: 'cascade',
        });
    };


    return User;
};