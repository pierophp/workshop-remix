import { ActionFunction } from "@remix-run/cloudflare";

export const action: ActionFunction = async ({ request, context }) => {
  const env = context.cloudflare.env as Env;

  const conteudo = { name: "Rodrigo" };

  await env.BUCKET.put("rodrigo.json", JSON.stringify(conteudo, null, 2));

  return new Response(`Put  successfully!`);
};
