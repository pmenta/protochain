import { IBlock, IBlockchain } from "../../domain";
import { Block } from "../block";

export class Blockchain implements IBlockchain {
  blocks: IBlock[];
  private nextIndex: number = 0;

  constructor() {
    this.blocks = [new Block(this.nextIndex, "", "Genesis Block")];
    this.nextIndex++;
  }

  getLatestBlock(): IBlock {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(data: string): boolean {
    const latestBlock = this.getLatestBlock();
    const block = new Block(this.nextIndex, latestBlock.hash, data);

    if (
      !block.isValid({
        previousHash: latestBlock.hash,
        previousIndex: latestBlock.index,
      })
    )
      return false;

    this.blocks.push(block);
    this.nextIndex++;

    return true;
  }

  isValid(): boolean {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
