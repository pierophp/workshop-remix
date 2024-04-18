import { ActionFunction } from "@remix-run/cloudflare";
import { readFile, writeFile } from "node:fs/promises";

export async function action({ params, request }: ActionFunction) {
  console.log("ID", request.method);
  const body = await request.formData();
  const file = await readFile("banco_de_dados.json");
  const db = JSON.parse(file.toString());

  if (request.method === "POST") {
    db.orders.push({
      id: body.get("id") as string,
      customer: body.get("customer") as string,
    });
  } else if (request.method === "PUT") {
    const row = db.orders.find(
      (order) => String(order.id) === String(params.id)
    );
    row.customer = body.get("customer");
  } else if (request.method === "DELETE") {
    db.orders = db.orders.filter(
      (order) => String(order.id) !== String(params.id)
    );
  }

  await writeFile("banco_de_dados.json", JSON.stringify(db, null, 2));

  return new Response("{}", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function loader() {
  const file = await readFile("banco_de_dados.json");

  return new Response(file.toString(), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
