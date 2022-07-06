import { Logger as TypeOrmLogger, QueryRunner } from "typeorm";
import { Logger } from "pino";

export class TypeOrmPinoLogger implements TypeOrmLogger {
  private logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger.child({ name: "TypeOrm" });
  }
  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    return this.logger.trace({
      query,
      parameters,
      msg: "Query",
    });
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: QueryRunner | undefined,
  ) {
    return this.logger.error({
      error,
      query,
      parameters,
      msg: "QueryError",
    });
  }
  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
    return this.logger.warn({
      time,
      query,
      parameters,
      msg: "QuerySlow",
    });
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    return this.logger.debug({
      msg: "SchemaBuild",
      message,
    });
  }
  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    return this.logger.info({
      msg: "Migration",
      message,
    });
  }
  log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner | undefined) {
    return this.logger[level === "log" ? "info" : level]({
      message,
    });
  }
}
