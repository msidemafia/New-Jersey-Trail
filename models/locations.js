module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        place: DataTypes.STRING,
        route: DataTypes.INTEGER,
        ableToPurchase: DataTypes.BOOLEAN,
        event: DataTypes.BOOLEAN,
        type: DataTypes.STRING,
    });

    return Location;
};
