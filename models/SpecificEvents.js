module.exports = function (sequelize, DataTypes) {
    var SpecificEvents = sequelize.define("SpecificEvents", {
        event: DataTypes.STRING,
        place: DataTypes.STRING,
        route: DataTypes.INTEGER,  
    });  
    
    SpecificEvents.associate = function (models) {
        SpecificEvents.belongsTo(models.Location, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return SpecificEvents;
};
