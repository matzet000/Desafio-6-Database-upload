"use strict";
exports.__esModule = true;
require("reflect-metadata");
require("dotenv/config");
var express_1 = require("express");
require("express-async-errors");
var routes_1 = require("./routes");
var AppError_1 = require("./errors/AppError");
var database_1 = require("./database");
database_1["default"]();
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(routes_1["default"]);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1["default"]) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
exports["default"] = app;
