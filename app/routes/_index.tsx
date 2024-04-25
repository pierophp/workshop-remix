import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "Meu Projeto" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  return {};
};

export const loader: LoaderFunction = async () => {
  return {};
};

export default function Index() {
  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1 className="text-3xl font-bold text-blue-500">
          Bem-vindo ao Workshop!
        </h1>
        <div className="w-full max-w-sm space-y-2">
          {/* <h1>Todos</h1>
          <div>Usuário: {todos.userId}</div>
         <div>Título: {todos.title}</div> */}

          <Form className="space-y-2" method="post">
            <Input placeholder="ID" required name="id" />
            <Input placeholder="Cliente" required name="customer" />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
