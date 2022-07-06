import pino, { Logger } from "pino";

import { Config } from "../../shared/config/config.js";

export const createPinoLogger = ({
  config,
}: {
  config: Config;
}): Logger<{
  name: string;
  level: Config["LOG_LEVEL"];
}> => {
  return pino({
    name: `${config.PROJECT_NAME}-${config.PROJECT_VERSION}`,
    level: config.LOG_LEVEL,
  });
};

export const createPinoLoggerDomain =
  (domain: string) =>
  ({
    logger,
  }: {
    logger: Logger<{
      name: string;
      level: Config["LOG_LEVEL"];
    }>;
  }) =>
    logger.child({ domain });
