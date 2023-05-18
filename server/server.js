const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Express is working! Yes sir");
});

// Get the people from SWAPI
app.get("/people", (req, res) => {
  axios
    .get("https://swapi.dev/api/people/1")
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("App listening on Port 3000");
});
