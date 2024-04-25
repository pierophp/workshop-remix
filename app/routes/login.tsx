import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="p-10">
      <Form action="/auth/google" method="post">
        <h1 className="text-xl font-bold">Faça Login</h1>
        <Button variant={"destructive"}>Login with Google</Button>
      </Form>
    </div>
  );
}
