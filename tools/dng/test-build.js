#!/usr/local/bin/node

var builder = require("./build-dng-common");

builder.buildW3C(false, function () {
    console.log("Script built");
});
