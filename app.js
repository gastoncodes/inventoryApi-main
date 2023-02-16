const express = require("express");
const app = express();
const ConnectDB = require("./database/connect");
const cors = require("cors");
const port = process.env.PORT || 5050;

app.use(cors()); //i also put cors like to access cross origin sites
app.use(express.json());

// get api
app.get("/", (req, res) => {
  res.send("This is an api for my app.");
});

//middle wares
app.use("/api/v6/", require("./Routes/account"));
app.use("/api/v6/", require("./Routes/business"));
app.use("/api/v6/", require("./Routes/product"));

//database connectivity
ConnectDB();

app.listen(port, console.log(`server started on port: ${port}.......`));
