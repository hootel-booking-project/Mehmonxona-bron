import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({ level: "error", format: winston.format.simple() }),
    new DailyRotateFile({
      filename: "logs/%DATE%-error.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "7d",
    }),
    new DailyRotateFile({
      filename: "logs/%DATE%-info.log",
      datePattern: "YYYY-MM-DD",
      level: "info",
      maxFiles: "7d",
    }),
    new DailyRotateFile({
      filename: "logs/%DATE%-combined.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
    }),
  ],
});

export default logger;
