var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:11235/tenis_championship";

module.exports = {
    getConnecton: function () {
        if (this.MongoDB == "") {
            this.MongoDB = mongoose.connect(mongoURI).connection;
            this.MongoDB.on('error', function (err) { console.log(err.message); });
            this.MongoDB.once('open', function () {
                console.log("mongodb connection open");
            });
            return this.MongoDB;
        } else {
            return this.MongoDB;
        }
    },

    MongoDB : ""

}