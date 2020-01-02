// Responsible for retrieving and persisting affinity data
export interface AffinityStorage {
  increment: (a:string, b:string) => Promise<number>;
  getRanking: (a:string) => Promise<string[]>;
}