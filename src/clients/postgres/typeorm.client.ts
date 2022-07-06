import "reflect-metadata";
import { DataSource } from "typeorm";
import { Logger } from "pino";

import { Config } from "../../shared/config/config.js";

import { TypeOrmPinoLogger } from "./typeorm.logger.js";

export const createTypeormClient = async ({
  config,
  logger,
}: {
  config: Config;
  logger: Logger;
}): Promise<DataSource> => {
  const dataSource = new DataSource({
    type: "postgres",
    host: config.POSTGRES_HOST,
    port: 5432,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    synchronize: false,
    logging: true,
    logger: new TypeOrmPinoLogger(logger),
    entities: ["./src/domains/**/*.entity.*"],
    subscribers: [],
    migrations: ["./src/database-migration/*"],
  });

  const connection = await dataSource.initialize();

  return connection;
};
