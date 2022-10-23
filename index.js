const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors.js");

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database connected");
    },
    (error) => {
        console.log("Database can't be connected: " + error);
    }
);

// initialize middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// initialize routes
app.use("/api", require("./routes/app.routes"));

app.use(errors.errorHandler);

// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log("Ready to Go!");
});