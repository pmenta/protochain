import { describe, expect, test } from "bun:test";
import { Block } from ".";

describe("Block tests", () => {
  test("Should BE valid", () => {
    const block = new Block(1, "Genesis", "Lorem");
    expect(block.isValid()).toBeTrue();
  });

  test("Should NOT be valid (index)", () => {
    const block = new Block(-1, "Genesis", "Lorem");
    expect(block.isValid()).toBeFalse();
  });
});
