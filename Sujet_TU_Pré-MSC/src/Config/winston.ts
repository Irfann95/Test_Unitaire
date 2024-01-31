import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

//istanbul ignore next
const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message} `;
});

const myLevels = {
  colors: {
    info: 'bold cyan',
    warn: 'bold yellow',
    error: 'bold red',
    debug: 'bold magenta',
    silly: 'bold white',
  },
};

winston.addColors(myLevels.colors);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        myFormat,
      ),
    }),
  ],
});

export function setupLoggerForTest() {
  logger.transports.forEach((t) => (t.silent = true));
}

// istanbul ignore if
if (process.env.NODE_ENV == 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'app.log',
    }),
  );
}
