import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { readFile, writeFile } from "node:fs/promises";
import { loadTodos } from "~/helpers/load.todos";
import { useState } from "react";

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
  const body = await request.formData();

  const file = await readFile("banco_de_dados.json");
  const db = JSON.parse(file.toString());
  db.orders.push({
    id: body.get("id") as string,
    customer: body.get("customer") as string,
  });

  await writeFile("banco_de_dados.json", JSON.stringify(db, null, 2));

  return {};
};

export const loader: LoaderFunction = async () => {
  const file = await readFile("banco_de_dados.json");
  const request = JSON.parse(file.toString());

  const todos = await loadTodos();

  return { orders: request.orders, todos };
};

export default function Index() {
  const { orders, todos } = useLoaderData();
  const [horas, setHoras] = useState([]);
  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1 className="text-3xl font-bold text-blue-500">
          Bem-vindo ao Workshop!
        </h1>
        <div className="w-full max-w-sm space-y-2">
          {orders.map((order) => {
            return (
              <div key={order.id}>
                {order.id} - {order.customer}
              </div>
            );
          })}

          {/* <h1>Todos</h1>
          <div>Usuário: {todos.userId}</div>
          <div>Título: {todos.title}</div> */}

          {horas.map((hora) => {
            return <div>{hora}</div>;
          })}

          <Button
            onClick={() => {
              const newHoras = structuredClone(horas);
              newHoras.push(
                String(
                  `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                )
              );
              setHoras(newHoras);
            }}
          >
            Adicionar
          </Button>

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
