import { sha256 } from "@noble/hashes/sha256";

class Block {
  constructor(
    public index: number,
    public timestamp: string,
    public data: { user: string; id: number },
    public previousHash: string,
    public hash: string
  ) {
    this.hash = this.calculateHash();
  }
  calculateHash(): string {
    // Create a string with the input values
    const inputString =
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash;

    // Convert the string to a byte array
    const inputBytes = new TextEncoder().encode(inputString);

    // Hash the byte array using your custom sha256 function
    const hashBytes = sha256(inputBytes);

    // Convert the resulting byte array to a hexadecimal string
    const hashHex = Array.from(hashBytes)
      .map((b) => (b < 16 ? "0" : "") + b.toString(16))
      .join("");

    return hashHex;
  }
}

export default Block;
