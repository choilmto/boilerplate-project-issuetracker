import { MongoMemoryServer } from "mongodb-memory-server";
var MongoClient = require("mongodb");

async function getConnectionString() {
  if (process.env.NODE_ENV === "test") {
    const mongoServer = new MongoMemoryServer();
    return await mongoServer.getUri();
  }
  return process.env.DB;
}

getConnectionString().then((connectionString: string) =>
  MongoClient.connect(connectionString, function (err, db): void {})
);

module.exports = MongoClient;
