"use strict";
exports.__esModule = true;
var bytesToHex = function (bytes) {
    return Array.from(bytes)
        .map(function (b) { return b.toString(16).padStart(2, "0"); })
        .join("");
};
exports["default"] = bytesToHex;
