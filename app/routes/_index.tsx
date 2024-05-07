import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getDb } from "~/db/get.db";
import { UserManager } from "~/db/user.manager";
import jwt from "@tsndr/cloudflare-worker-jwt";

export const meta: MetaFunction = () => {
  return [
    { title: "Meu Projeto" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const action: ActionFunction = async ({ request, context }) => {
  const env = context.cloudflare.env as Env;

  const body = await request.formData();

  const userManager = new UserManager(getDb(env));
  await userManager.insert({
    name: body.get("name") as string,
    email: body.get("email") as string,
  });

  return redirect("/");
};

export const loader: LoaderFunction = async () => {
  const token = await jwt.sign(
    { name: "John Doe", email: "john.doe@gmail.com" },
    "secret"
  );

  console.log({ token });

  return { token };
};

export default function Index() {
  const { token } = useLoaderData();

  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1 className="text-3xl font-bold text-blue-500">
          Bem-vindo ao Workshop! -
        </h1>
        <div className="w-full max-w-sm space-y-2">
          <Form className="space-y-2" method="post">
            <Input placeholder="Nome" required name="name" />
            <Input placeholder="E-mail" required name="email" type="email" />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>

        <div>TOKEN: {token}</div>
      </div>
    </>
  );
}
