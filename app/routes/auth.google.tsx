import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { getAuthenticator } from "~/services/auth.server";

export let loader = () => redirect("/login");

export let action = ({ request, context }: ActionFunctionArgs) => {
  return getAuthenticator(context).authenticate("google", request, { context });
};
