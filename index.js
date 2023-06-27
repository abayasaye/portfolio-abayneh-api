const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

async function runServer() {
  await require("./db").connect();

  app.use(
    "/api/v1/portfolios",
    require("./routes/portfolios")
  );
  app.use(
    "/api/v1/blogs",
    require("./routes/blogs")
  );


  app.get("/", (req, res) => {
    res.json({ message: "wolcome to the server" });
  });

  app.get("/test", (req, res) => {
    res.json({ message: "testtesttesttesttesttesttest" });
  });


  app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`server app listening on port: ${PORT}!`);
  });
}

runServer();
