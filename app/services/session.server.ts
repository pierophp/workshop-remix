import {
  AppLoadContext,
  createCookieSessionStorage,
} from "@remix-run/cloudflare";

export function getSessionStorage(
  context: AppLoadContext
): ReturnType<typeof createCookieSessionStorage> {
  const env = context.cloudflare.env as any;

  const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: "_session", // use any name you want here
      sameSite: "lax", // this helps with CSRF
      path: "/", // remember to add this so the cookie will work in all routes
      httpOnly: true, // for security reasons, make this cookie http only
      secrets: [env.SESSION_SECRET ?? "s3cr3t"], // replace this with an actual secret
      secure: env.NODE_ENV === "production", // enable this in prod only
    },
  });

  return sessionStorage;
}
