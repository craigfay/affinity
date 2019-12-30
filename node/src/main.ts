const http = require('@node-scarlet/http');
const { GET, POST } = http.methods;

const { incrementAffinity, getAffinityRanking } = require('./functions');

// handler functions
async function handleIncrementRequest(req, meta) {
  const { a, b } = req.body;

  if (a && b) {
    await incrementAffinity(a,b);
    return 200;
  }
}

async function handleAffinityRankingRequest(req, meta) {
  const { slug } = req.params;

  if (slug) {
    return await getAffinityRanking(slug);
  }
}

// server setup
const requests = http.server();
requests.route(POST, '/increment', handleIncrementRequest);
requests.route(GET, '/:slug/ranking', handleAffinityRankingRequest);
requests.listen(process.env.PORT);
