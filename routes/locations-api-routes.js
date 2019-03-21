var locationsArray = require("../data/locationsData");
var eventsArray = require("../data/eventsData");

module.exports = function (app) {

    app.get("/api/locationsArray", function (req, res) {
        res.json(locationsArray);
    });


    app.get("/api/eventsArray", function (req, res) {
        res.json(eventsArray);
    });
}