// create server node js express
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("./person.model");

const PORT = process.env.SERVER_PORT || 8080;
const DB_URL = process.env.DATABASE_URL;

// APP CONFIG
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
// APP CONFIG END

// MONGOOSE CONFIG
mongoose.set("strictQuery", false);
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
    }
  }
);
// MONGOOSE CONFIG END

// ADD DEFAULT PERSON
Person.find({}, (err, persons) => {
  if (err || !persons || persons.length === 0) {
    console.log("Adding person...");
    const person = new Person({
      name: "Toto",
    });
    person.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Person added");
      }
    });
  }
});
// ADD DEFAULT PERSON END

// ROUTES
app.get("/api/hello", (_, res) => {
  Person.find({}, (err, persons) => {
    if (err || !persons || persons.length === 0) {
      console.log(err, persons);
      res.json("No person found");
    } else {
      res.json(`Hello ${persons[0].name}!`);
    }
  });
});
// ROUTES END
