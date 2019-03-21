var db = require("../models");

module.exports = function(app) {
    app.get("/api/user", function(req, res){
        db.User.findAll({
            include:[db.Inventory]
        }).then(function(data){
            console.log(data);
            res.json(data);
        });
    });


    app.post('/api/user', function(req, res) {
        db.User.create(req.body).then(function(data){
            console.log(data);
            res.json(data);
        });
    });
};