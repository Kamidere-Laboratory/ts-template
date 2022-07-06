import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: false,
  logging: true,
  entities: ["./src/**/*.entity.*"],
  subscribers: [],
  migrations: ["./src/database-migration/*"],
});
