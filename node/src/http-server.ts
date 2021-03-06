const http = require('@node-scarlet/http');
const { GET, POST } = http.methods;

import { HttpServerContract } from './contracts';

// Because request handler functions depend on an affinityStorage device,
// we use closure to create them dynamically instead of hardcoding.
// We don't want to hardcode our database details into server details.
function createIncrementHandler(storage) {
  return async function handleIncrementRequest(req, meta) {
    const { a, b } = req.body;
  
    if (a && b) {
      return await storage.incrementAffinity(a,b);
    }
  }
}
function createRankingHandler(storage) {
  return async function handleAffinityRankingRequest(req, meta) {
    const { slug } = req.params;

    if (slug) {
      return await storage.getAffinityRanking(slug);
    }
  }
}

// Exporting this module's functions as a fulfillment of a contract
export const HttpServer: HttpServerContract = {
  start(port, storage) {
    const requests = http.server();
    requests.route(POST, '/increment', createIncrementHandler(storage));
    requests.route(GET, '/:slug/ranking', createRankingHandler(storage));
    requests.listen(port);
  }
}
