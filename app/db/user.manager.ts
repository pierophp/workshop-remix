import { Kysely } from "kysely";
import { DB } from "./kysely.types";

type InsertRequest = { email: string; name: string };

export class UserManager {
  constructor(private db: Kysely<DB>) {}

  public async insert({ name, email }: InsertRequest) {
    return await this.db
      .insertInto("User")
      .values([
        {
          name,
          email,
        },
      ])
      .execute();
  }
}
