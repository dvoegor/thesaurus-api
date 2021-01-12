const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

const indexRoute = require("./routes/index");
const editRoute = require("./routes/edit");
const createRoute = require("./routes/create");
const loginRoute = require("./routes/login");

app.use("/", indexRoute);
app.use("/edit", editRoute);
app.use("/create", createRoute);
app.use("/login", loginRoute);

app.use(function (req, res, next) {
  next(res.status(404).send(createError(404, "Такая страница не существует")));
});

app.listen(port, () => {
  console.log(`thesaurus-api at PORT:${port}`);
});

module.exports = app;
