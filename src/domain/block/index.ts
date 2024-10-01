export interface IBlock {
  index: number;
  hash: string;
  timestamp: number;
  previousHash: string;
  data: string;

  isValid(): boolean;
  getHash(): string;
}
