import { HttpServer } from './http-server';
import { AffinityStorage } from './affinity-storage';

const port = Number(process.env.PORT);

// System input (http) depends on another I/O device (database), which
// we pass in at runtime
HttpServer.start(port, AffinityStorage);
