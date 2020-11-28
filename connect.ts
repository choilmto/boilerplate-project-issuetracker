import { MongoMemoryServer } from "mongodb-memory-server";
var MongoClient = require("mongodb").MongoClient;

async function getConnectionString() {
  if (process.env.NODE_ENV === "test") {
    const mongoServer = new MongoMemoryServer();
    return await mongoServer.getUri();
  }
  return process.env.DB;
}

module.exports = getConnectionString().then(
  async (connectionString: string) => {
    var db = await MongoClient.connect(connectionString);
    return db.db("issue_tracker");
  }
);
