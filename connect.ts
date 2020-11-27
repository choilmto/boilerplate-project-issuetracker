import { MongoMemoryServer } from "mongodb-memory-server";
var MongoClient = require("mongodb");
var logger = require("./logger");

async function getConnectionString() {
  if (process.env.NODE_ENV === "test") {
    const mongoServer = new MongoMemoryServer();
    return await mongoServer.getUri();
  }
  return process.env.DB;
}

getConnectionString().then((connectionString: string) =>
  MongoClient.connect(connectionString, function (err, db): void {
    logger.error(err);
  })
);

module.exports = MongoClient;
