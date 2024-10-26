const express = require("express");
const nocache = require("nocache");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const router = require("./router");

const app = express();
const port = 4750;

let a = 0;

// Middleware
app.use(nocache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
   
  })
);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Static files
app.use("/static", express.static(path.join(__dirname, "public")));

// Routes
app.use("/route", router);

app.get("/", (req, res) => {
  if (!req.session.user) {
    res.render("base", { hj: "Login Page", a: "" });
  } else {
    res.render("dashboard", { user: req.session.user });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}  \n http://localhost:4750/ `);
});
















