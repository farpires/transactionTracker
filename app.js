"use strict";
const express = require("express");
const router = require("./src/network/routes");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);
module.exports = server;