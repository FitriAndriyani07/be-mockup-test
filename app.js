require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");
const router = require("./routes");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const file = fs.readFileSync("./documentationSwagger.yaml", "utf8");

const swaggerDocument = YAML.parse(file);

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(router);

// 404
app.use((req, res) => {
  return res.status(404).json({
      status: false,
      message: 'Not Found',
      err: `Cannot find ${req.url}`,
      data: null,
  });
});

// 500
app.use((err, req, res) => {
  console.log(err);
  return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      err: err.message,
      data: null,
  });
});

module.exports = app;
