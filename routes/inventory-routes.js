var db = require("../models");


module.exports = function (app) {
    // route to the db
    app.get("/api/inventory", function (req, res) {
        db.Inventory.findAll({}).then(function (data) {
            console.log(data);
            res.json(data);
        });
    });

    app.get("/api/newInventory", function(req, res){
        db.Inventory.findOne({
            limit: 1,
            order: [['createdAt', 'DESC']]
        }).then(function(data){
            console.log(data);
            res.json(data)
        });
    });



    // route to a specific id
    app.get("/api/inventory/:id", function (req, res) {
        db.Inventory.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            console.log(data);
            res.json(data);
        });
    });
    // route to post to the db
    app.post("/api/inventory", function (req, res) {
        console.log(req.body);
        db.Inventory.create(req.body).then(function (data) {
            console.log(data);
            res.json(data);
        });
    });

    // route for updating inventory
    app.put("/api/inventory/", function (req, res) {
        db.Inventory.update(req.body, {
            where: {
                id: req.body.id,
            }
        }).then(function (data) {
            console.log(data);
            res.json(data);
        });
    });
};