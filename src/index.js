"use strict";
exports.__esModule = true;
var chain_1 = require("./chain");
var fs = require("fs");
var filePath = "./chain.json";
var chain = new chain_1["default"]([]);
chain.createGenesisBlock();
var block2 = chain.createBlock({
    user: "Alice",
    id: 1
});
chain.addBlock(block2);
var writeFileSync = function (file) {
    return fs.writeFileSync(file, JSON.stringify(chain));
};
writeFileSync(filePath);
var readFileSync = function (file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
};
console.log(readFileSync(filePath));
