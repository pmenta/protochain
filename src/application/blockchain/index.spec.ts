import { describe, expect, it } from "vitest";
import { Blockchain } from ".";

describe("Blockchain tests", () => {
  it("Should HAS a genesis Block", () => {
    const blockchain = new Blockchain();
    const genesisBlock = blockchain.getLatestBlock();

    expect(blockchain.blocks.length).toEqual(1);
    expect(genesisBlock.data).toEqual("Genesis Block");
    expect(genesisBlock.index).toEqual(0);
    expect(genesisBlock.previousHash).toEqual("");
  });

  it("Should BE valid", () => {
    const blockchain = new Blockchain();

    blockchain.addBlock("Block 1");
    blockchain.addBlock("Block 2");

    expect(blockchain.isValid()).toBe(true);
  });

  it("Should ADD a new valid Block to blocks", () => {
    const blockchain = new Blockchain();
    const newBlockData = "Exodus Block";

    const hasAdded = blockchain.addBlock(newBlockData);
    const latest = blockchain.getLatestBlock();

    expect(hasAdded).toBeTruthy();
    expect(latest.data).toEqual(newBlockData);
    expect(blockchain.blocks.length).toEqual(2);
  });

  it("Should NOT a new invalid Block to blocks (data)", () => {
    const blockchain = new Blockchain();
    const hasAdded = blockchain.addBlock("");
    expect(hasAdded).toBeFalsy();
    expect(blockchain.blocks.length).toEqual(1);
  });

  it("Should NOT BE valid (previousHash)", () => {
    const blockchain = new Blockchain();

    blockchain.addBlock("Block 1");
    blockchain.addBlock("Block 2");

    blockchain.blocks[1].previousHash = "invalid-hash";
    expect(blockchain.isValid()).toBe(false);
  });

  it("Should NOT BE valid (missing Block)", () => {
    const blockchain = new Blockchain();

    blockchain.addBlock("Block 1");
    blockchain.addBlock("Block 2");

    blockchain.blocks.splice(1, 1);
    expect(blockchain.isValid()).toBe(false);
  });
});
