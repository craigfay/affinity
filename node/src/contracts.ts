// Responsible for retrieving and persisting affinity data
export interface StorageContract {
  incrementAffinity: (a:string, b:string) => Promise<number>;
  getAffinityRanking: (a:string) => Promise<string[]>;
}

// Responsible for exposing application functionality to remote requesters
export interface HttpServerContract {
  start: (port:number, storage:StorageContract) => any
}