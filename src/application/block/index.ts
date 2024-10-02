import { BlockValidationInput, IBlock } from "../../domain";
import { createHash } from "crypto";

/**
 * Block class
 */
export class Block implements IBlock {
  readonly hash: string;
  readonly timestamp: number = Date.now();

  /**
   * Creates a new Block
   * @param index The Block index on the blockchain
   * @param previousHash The previous Block hash
   * @param data The Block data
   */
  constructor(
    public index: number,
    public previousHash: string,
    public data: string
  ) {
    this.hash = this.getHash();
  }

  private getHash(): string {
    return createHash("sha256")
      .update(`${this.index}${this.data}${this.timestamp}${this.previousHash}`)
      .digest("hex");
  }

  isValid(input: BlockValidationInput): boolean {
    if (this.index < 0) return false;
    if (!this.data) return false;
    if (input.previousHash !== this.previousHash) return false;
    if (input.previousIndex !== this.index - 1) return false;

    return true;
  }
}
