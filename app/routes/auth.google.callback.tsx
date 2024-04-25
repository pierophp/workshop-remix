import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export let loader = ({ request, context }: LoaderFunctionArgs) => {
  return getAuthenticator(context).authenticate("google", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    context,
  });
};
