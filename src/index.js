const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/",(req, res)=>{
  res.send("Ok")
})

app.listen(ServerConfig.PORT, () => {
  console.log(`http://localhost:${ServerConfig.PORT}`);
});
