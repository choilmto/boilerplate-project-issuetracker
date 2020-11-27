const pino = require("pino");
const { createWriteStream } = require("pino-logflare");

const connectPino = () => {
  const stream = createWriteStream({
    apiKey: process.env.LOGFLARE_API_KEY,
    sourceToken: process.env.LOGFLARE_SOURCE_TOKEN,
  });
  const options: object = {};
  return pino(options, stream);
};

const logger = process.env.NODE_ENV === "production" ? connectPino() : pino();

module.exports = logger;
