import { createPinoLogger, createPinoLoggerDomain } from "./pino.client.js";

export const createLogger = createPinoLogger;
export const createDomainLogger = createPinoLoggerDomain;
