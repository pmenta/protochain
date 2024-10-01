import { IBlock } from "../../domain";
import { createHash } from "crypto";

/**
 * Block class
 */
export class Block implements IBlock {
  hash: string;
  timestamp: number = Date.now();

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

  getHash(): string {
    return createHash("sha256")
      .update(`${this.index}${this.data}${this.timestamp}${this.previousHash}`)
      .digest("hex");
  }

  isValid(): boolean {
    return this.index >= 0 && !!this.hash;
  }
}
