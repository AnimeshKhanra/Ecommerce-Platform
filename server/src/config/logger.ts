import winston from 'winston';

const { combine, timestamp, errors, json, colorize, printf, simple } = winston.format;

// Format used for file transports (no color, JSON)
const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json(),
);

// Format used for console (colorized, human-readable)
const consoleFormat = combine(
  timestamp(),
  errors({ stack: true }),
  colorize(),
  printf(({ level, message, timestamp, stack }) => {
    return `{ ${timestamp} | ${level}: | ${stack || message} }`;
  }),
);

export const logger = winston.createLogger({
  level: 'info',
  format: fileFormat, // default format, used by transports that don't override it
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});