const redis = require("redis")
const { promisify } = require('util');

// Create a redis client, and async versions of necessary functions
const client = redis.createClient(process.env.REDIS_HOST);
const zincrby = promisify(client.zincrby).bind(client);
const zrevrange = promisify(client.zrevrange).bind(client);

// Increase the level of association (affinity) between two items
export async function incrementAffinity(a:string, b:string) {
  await zincrby(a, 1, b);
  await zincrby(b, 1, a);
}

// Return an ordering of associated items for a given item
export async function getAffinityRanking(a:string) {
  return await zrevrange(a, 0, -1);
}
