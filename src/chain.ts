import { sha256 } from "@noble/hashes/sha256";
import Block from "./block";
import bytesToHex from "./lib/bytesToHex";
import * as fs from "fs";

class Chain {
  constructor(public chain: Block[]) {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(): Block {
    const genesisHash = sha256(new TextEncoder().encode("0"));
    const genesisHashHex = bytesToHex(genesisHash);

    return new Block(
      0,
      Date.now().toString(),
      {
        user: "Genesis",
        id: 0,
      },
      "0",
      genesisHashHex
    );
  }

  createBlock(data: { user: string; id: number }): Block {
    const previousBlock = this.chain[this.chain.length - 1];
    const previousHash = previousBlock.hash;
    const index = previousBlock.index + 1;
    const timestamp = Date.now().toString();

    const block = new Block(index, timestamp, data, previousHash, "");

    block.hash = block.calculateHash();

    return block;
  }

  addBlock(block: Block): void {
    this.chain.push(block);
  }

  isValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  saveToFile(filePath: string): void {
    const json = JSON.stringify(this.chain);
    fs.writeFileSync(filePath, json);
  }

  static loadFromFile(filePath: string): Chain {
    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, "utf8");
      const chainData: Block[] = JSON.parse(json);
      return new Chain(chainData);
    } else {
      // Create a new chain with only the genesis block if file doesn't exist
      return new Chain([]);
    }
  }
}

export default Chain;
