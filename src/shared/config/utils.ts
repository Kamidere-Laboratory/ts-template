import { readFile } from "fs/promises";
import { join } from "node:path";

export const getSecretAndParse = async (): Promise<Record<string, any>> => {
  return JSON.parse(await readFile(join(process.cwd(), "secret.json"), "utf-8"));
};
