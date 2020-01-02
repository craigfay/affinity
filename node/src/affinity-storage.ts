
const redis = require("redis")
const { promisify } = require('util');

import { StorageContract } from './contracts';

// Creating a redis client, and async versions of helper functions
const client = redis.createClient(process.env.REDIS_HOST);
const zincrby = promisify(client.zincrby).bind(client);
const zrevrange = promisify(client.zrevrange).bind(client);

// Increasing the level of association (affinity) between two items
async function incrementAffinity(a:string, b:string): Promise<number> {
  await zincrby(a, 1, b);
  return await zincrby(b, 1, a);
}

// Returning an ordering of associated items for a given item
async function getAffinityRanking(a:string): Promise<string[]> {
  return await zrevrange(a, 0, -1);
}

// Exporting this module's functions as a fulfillment of a contract
export const Storage: StorageContract = {
  incrementAffinity,
  getAffinityRanking,
}
