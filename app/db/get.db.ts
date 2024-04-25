import { Kysely } from "kysely";
import { DB } from "./kysely.types";
import { D1Dialect } from "kysely-d1";

let dbCache: Kysely<DB> | null = null;

export function getDb(env: Env): Kysely<DB> {
  if (dbCache) {
    return dbCache;
  }
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  });

  dbCache = db;

  return dbCache;
}
