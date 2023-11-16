const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api/index");

const { sequelize } = require("./db");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("res.locals");
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //render the error json
  const statusCode = err.statusCode || 500;
  const message = err.message;

  res.status(statusCode).json({ message: message });

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
