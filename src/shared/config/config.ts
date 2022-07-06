import { z } from "zod";

import { InvalidConfigError } from "./errors/invalid-config.error.js";

// https://getpino.io/#/docs/api?id=level-1
// !! should not be used outside this file !!
const logLevels = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;

export const configSchema = z.object({
  // PROJECT
  PROJECT_NAME: z.string(),
  PROJECT_VERSION: z.string(),
  // POSTGRES
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.number(),
  // OTHERS
  LOG_LEVEL: z.enum(logLevels),
  MACHINE_IDENTIFIER: z.string(),
});
export type Config = z.infer<typeof configSchema>;

type CreateConfigPayload = {
  [Key in keyof Config]: any;
};

export const createConfig = async (payload: CreateConfigPayload): Promise<Config> => {
  try {
    return configSchema.parseAsync(payload);
  } catch (error: any) {
    throw new InvalidConfigError();
  }
};
