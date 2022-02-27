import winston from "winston";
import config from "../config/index.js";

const logger = winston.createLogger({
  level: config.NODE_ENV === "production" ? "info" : "debug",
  silent: config.NODE_ENV === "test",
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
