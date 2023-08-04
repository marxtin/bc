import Chain from "./chain";
import * as fs from "fs";

const filePath = "./chain.json";

const chain = new Chain([]);

chain.createGenesisBlock();

const block2 = chain.createBlock({
  user: "Alice",
  id: 1,
});

chain.addBlock(block2);

const writeFileSync = (file: string) =>
  fs.writeFileSync(file, JSON.stringify(chain));

writeFileSync(filePath);

const readFileSync = (file: string) =>
  JSON.parse(fs.readFileSync(file, "utf8"));

console.log(readFileSync(filePath));
