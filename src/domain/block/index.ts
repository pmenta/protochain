export type BlockValidationInput = {
  previousHash: string;
  previousIndex: number;
};

export interface IBlock {
  index: number;
  hash: string;
  timestamp: number;
  previousHash: string;
  data: string;

  isValid(input: BlockValidationInput): boolean;
}
