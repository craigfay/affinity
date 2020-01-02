// Responsible for retrieving and persisting affinity data
export interface AffinityRepository {
  incrementAffinity: (a:string, b:string) => Promise<number>;
  getAffinityRanking: (a:string) => Promise<string[]>;
}