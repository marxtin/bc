"use strict";
exports.__esModule = true;
var sha256_1 = require("@noble/hashes/sha256");
var Block = /** @class */ (function () {
    function Block(index, timestamp, data, previousHash, hash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
        this.hash = this.calculateHash();
    }
    Block.prototype.calculateHash = function () {
        // Create a string with the input values
        var inputString = this.index +
            this.timestamp +
            JSON.stringify(this.data) +
            this.previousHash;
        // Convert the string to a byte array
        var inputBytes = new TextEncoder().encode(inputString);
        // Hash the byte array using your custom sha256 function
        var hashBytes = (0, sha256_1.sha256)(inputBytes);
        // Convert the resulting byte array to a hexadecimal string
        var hashHex = Array.from(hashBytes)
            .map(function (b) { return (b < 16 ? "0" : "") + b.toString(16); })
            .join("");
        return hashHex;
    };
    return Block;
}());
exports["default"] = Block;
