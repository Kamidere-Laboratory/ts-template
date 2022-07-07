import { AwilixContainer, createContainer as createAwilixContainer, asValue, asFunction } from "awilix";
import { DataSource } from "typeorm";
import Bluebird from "bluebird";
import { Logger } from "pino";

import { createPostgresClient } from "./clients/postgres/index.js";
import { Config, createConfig } from "./shared/config/config.js";
import { getSecretAndParse } from "./shared/config/utils.js";
import { createDomainLogger, createLogger } from "./clients/logger/index.js";

export type Container = {
  config: Config;
  database: DataSource;
  logger: Logger;
};

export const createMainContainer = async (): Promise<AwilixContainer<Container>> => {
  const container = createAwilixContainer();

  const secret = await getSecretAndParse();

  container.register("config", asValue(await createConfig({ ...process.env, ...secret } as any)));
  container.register("logger", asFunction(createLogger));
  container.register("database", asFunction(createPostgresClient).singleton());

  return container;
};

export const createDomainContainer = async <
  ProvidedDeps extends Container | object,
  ExportedDeps extends ProvidedDeps | object,
>(
  mainContainer: AwilixContainer<Container>,
  domainName: string,
  dependencyRegistrars: ((
    constainer: AwilixContainer<ProvidedDeps>,
  ) => AwilixContainer<ProvidedDeps> | Promise<AwilixContainer<ProvidedDeps>>)[],
): Promise<AwilixContainer<Container & ExportedDeps>> => {
  const domainContainer = mainContainer.createScope<ProvidedDeps>();
  domainContainer.register(
    "logger",
    asValue(createDomainLogger({ logger: mainContainer.cradle.logger, domain: domainName })),
  );
  await Bluebird.each(dependencyRegistrars, (dr) => dr(domainContainer));

  // ! is specified in return type, to only show ExportedDeps and MainContainerDeps
  // ! there is no need to overenginer and add checks if it can or cannot be used
  // ! IDE should protect you but also allows for edge-case hacks
  return domainContainer as any;
};
