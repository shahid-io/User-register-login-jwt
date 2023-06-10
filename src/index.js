const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.use("/api", apiRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
