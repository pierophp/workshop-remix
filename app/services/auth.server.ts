// app/services/auth.server.ts
import { GoogleStrategy } from "remix-auth-google";
import { Authenticator } from "remix-auth";
import { getSessionStorage } from "~/services/session.server";
import { DB, User } from "~/db/kysely.types";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { AppLoadContext } from "@remix-run/cloudflare";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
// @todo Improve the any to User
let authenticatorCache: Authenticator<any> | null = null;

export function getAuthenticator(context: AppLoadContext): Authenticator<any> {
  if (authenticatorCache) {
    return authenticatorCache;
  }

  let authenticator = new Authenticator<any>(getSessionStorage(context));

  // @todo improve type
  const env = context.cloudflare.env as any;

  let googleStrategy = new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: env.GOOGLE_CALLBACK_URL as string,
    },
    async ({ profile, context }) => {
      const env = context?.cloudflare.env as Env;

      const db = new Kysely<DB>({
        dialect: new D1Dialect({ database: env.DB }),
      });

      const email = profile.emails[0].value;

      let user = await db
        .selectFrom("User")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();

      if (user) {
        return user;
      }

      const result = await db
        .insertInto("User")
        .values([
          {
            name: profile.displayName,
            email: email,
          },
        ])
        .executeTakeFirstOrThrow();

      user = await db
        .selectFrom("User")
        .selectAll()
        .where("id", "=", Number(result.insertId))
        .executeTakeFirstOrThrow();

      return user;
    }
  );

  authenticator.use(googleStrategy);

  authenticatorCache = authenticator;

  return authenticator;
}
