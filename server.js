const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("./config/index.js");
const port = process.env.PORT || config.port

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

console.log(config)

mongoose.connect(config.mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Connected to database"))
    .catch(console.log)

app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/api", require("./routes/api/controllers/stations/index"));
app.use("/api", require("./routes/api/controllers/trips/index"));
app.use("/api", require("./routes/api/controllers/users/index"));
app.use("/api", require("./routes/api/controllers/tickets/index"));