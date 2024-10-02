import { beforeAll, describe, expect, it } from "vitest";

import { Block } from ".";
import { BlockValidationInput, IBlock } from "../../domain";

describe("Block tests", () => {
  let previousBlock: IBlock;
  beforeAll(() => {
    const randomIndex = Math.floor(Math.random() * 100);
    const randomPreviousHash = Math.random().toString(36).substring(2, 15);
    const randomData = Math.random().toString(36).substring(2, 15);
    previousBlock = new Block(randomIndex, randomPreviousHash, randomData);
  });

  it("Should BE valid", () => {
    const block = new Block(
      previousBlock.index + 1,
      previousBlock.hash,
      "Exodus Block"
    );
    expect(
      block.isValid({
        previousHash: previousBlock.hash,
        previousIndex: previousBlock.index,
      })
    ).toBeTruthy();
  });

  it("Should NOT BE valid (index)", () => {
    const block = new Block(-1, previousBlock.hash, "Exodus Block");
    expect(
      block.isValid({
        previousHash: previousBlock.hash,
        previousIndex: previousBlock.index,
      })
    ).toBeFalsy();
  });

  it("Should NOT BE valid (previousHash)", () => {
    const block = new Block(1, "previousHash", "data");
    const input: BlockValidationInput = {
      previousHash: previousBlock.previousHash,
      previousIndex: previousBlock.index,
    };

    expect(block.isValid(input)).toBe(false);
  });

  it("Should NOT BE valid (previousIndex)", () => {
    const block = new Block(
      previousBlock.index - 1,
      previousBlock.hash,
      "Exodus Block"
    );
    expect(
      block.isValid({
        previousHash: previousBlock.hash,
        previousIndex: previousBlock.index,
      })
    ).toBeFalsy();
  });

  it("Should NOT BE valid (data)", () => {
    const block = new Block(1, previousBlock.previousHash, "");
    const input: BlockValidationInput = {
      previousHash: previousBlock.previousHash,
      previousIndex: previousBlock.index,
    };

    expect(block.isValid(input)).toBe(false);
  });

  it("Should HAVE a valid sha256 hash", () => {
    const block = new Block(1, "Genesis", "Lorem");
    const sha256Regex = /^[a-f0-9]{64}$/;
    expect(sha256Regex.test(block.hash)).toBeTruthy();
  });
});
