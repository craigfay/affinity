// Responsible for retrieving and persisting affinity data
export interface AffinityStorageContract {
  increment: (a:string, b:string) => Promise<number>;
  getRanking: (a:string) => Promise<string[]>;
}

// Responsible for exposing application functionality to remote requesters
export interface HttpServerContract {
  start: (port:number, storage:AffinityStorageContract) => any
}