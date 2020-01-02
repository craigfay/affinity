const http = require('@node-scarlet/http');
const { GET, POST } = http.methods;

const { RedisAffinityStorage: AffinityStorage } = require('./functions');

// handler functions
async function handleIncrementRequest(req, meta) {
  const { a, b } = req.body;

  if (a && b) {
    return await AffinityStorage.increment(a,b);
  }
}

async function handleAffinityRankingRequest(req, meta) {
  const { slug } = req.params;

  if (slug) {
    return await AffinityStorage.getRanking(slug);
  }
}

// server setup
const requests = http.server();
requests.route(POST, '/increment', handleIncrementRequest);
requests.route(GET, '/:slug/ranking', handleAffinityRankingRequest);
requests.listen(process.env.PORT);
