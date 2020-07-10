const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
const config = require("./config/index.js");

console.log(config);

const port = process.env.PORT || config.port

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

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