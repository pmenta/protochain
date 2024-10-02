import { IBlock } from "../block";

export interface IBlockchain {
  blocks: IBlock[];

  addBlock(data: string): boolean;
  getLatestBlock(): IBlock;
  isValid(): boolean;
}
