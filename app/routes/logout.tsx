import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  await getAuthenticator(context).logout(request, { redirectTo: "/login" });
}
