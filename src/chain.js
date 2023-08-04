"use strict";
exports.__esModule = true;
var sha256_1 = require("@noble/hashes/sha256");
var block_1 = require("./block");
var bytesToHex_1 = require("./lib/bytesToHex");
var fs = require("fs");
var Chain = /** @class */ (function () {
    function Chain(chain) {
        this.chain = chain;
        this.chain = [this.createGenesisBlock()];
    }
    Chain.prototype.createGenesisBlock = function () {
        var genesisHash = (0, sha256_1.sha256)(new TextEncoder().encode("0"));
        var genesisHashHex = (0, bytesToHex_1["default"])(genesisHash);
        return new block_1["default"](0, Date.now().toString(), {
            user: "Genesis",
            id: 0
        }, "0", genesisHashHex);
    };
    Chain.prototype.createBlock = function (data) {
        var previousBlock = this.chain[this.chain.length - 1];
        var previousHash = previousBlock.hash;
        var index = previousBlock.index + 1;
        var timestamp = Date.now().toString();
        var block = new block_1["default"](index, timestamp, data, previousHash, "");
        block.hash = block.calculateHash();
        return block;
    };
    Chain.prototype.addBlock = function (block) {
        this.chain.push(block);
    };
    Chain.prototype.isValid = function () {
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    };
    Chain.prototype.saveToFile = function (filePath) {
        var json = JSON.stringify(this.chain);
        fs.writeFileSync(filePath, json);
    };
    Chain.loadFromFile = function (filePath) {
        if (fs.existsSync(filePath)) {
            var json = fs.readFileSync(filePath, "utf8");
            var chainData = JSON.parse(json);
            return new Chain(chainData);
        }
        else {
            // Create a new chain with only the genesis block if file doesn't exist
            return new Chain([]);
        }
    };
    return Chain;
}());
exports["default"] = Chain;
