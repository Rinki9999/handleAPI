const cluster = require("cluster");
const os = require("os");
const app = require("./app");

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 3000;

if (cluster.isPrimary) {
  console.log(`🚀 Master ${process.pid} running. Starting ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`✅ Worker ${process.pid} started on port ${PORT}`);
  });
}
