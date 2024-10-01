import { describe, expect, test } from "vitest";
import { Block } from ".";

describe("Block tests", () => {
  test("Should BE valid", () => {
    const block = new Block(1, "Genesis", "Lorem");
    expect(block.isValid()).toBeTruthy();
  });

  test("Should NOT be valid (index)", () => {
    const block = new Block(-1, "Genesis", "Lorem");
    expect(block.isValid()).toBeFalsy();
  });

  test("Should have a valid sha256 hash", () => {
    const block = new Block(1, "Genesis", "Lorem");
    const sha256Regex = /^[a-f0-9]{64}$/;
    expect(sha256Regex.test(block.hash)).toBeTruthy();
  });
});
