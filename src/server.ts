import { Server } from "http";
import { envVars } from "./app/config/env";
import app from "./app";
import { gracefulShutdown } from "./app/utils/gracefulShutdown";
import { prisma } from "./app/config/db";
import { seedAdmin } from "./app/utils/seedAdmin";
// import { seedAdmin } from "./app/utils/seedAdmin";

let server: Server;

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("*** DB connection successful!!");
  } catch (error) {
    console.error("*** DB connection failed!", error);
    process.exit(1);
  }
}

const startServer = async () => {
  try {
    await connectToDB();

    console.log("Connected to resume-nest DataBase!");
    server = app.listen(envVars.PORT, () => {
      console.log(`resume-nest Server is listening on port: ${envVars.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await startServer();
  await seedAdmin();
})();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection detected... server shutting down..:", err);
  gracefulShutdown(server, 1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception Detected! server shutting down!!!", err);
  gracefulShutdown(server, 1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Signal Received! server shutting down!!!");
  gracefulShutdown(server, 0);
});

process.on("SIGINT", () => {
  console.log("SIGINT Signal Received! Server Shutting down gracefully.!!!");
  gracefulShutdown(server, 0);
});
