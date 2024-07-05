import { createClient } from "@/utils/supabase/client";
import { FormEvent } from "react";
import Button from "./Button";
import Input from "./form/Input";

const supabase = createClient();

const Login = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // TODO: Redirect to error page
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-96 px-2">
      <label className="text-zinc-400" htmlFor="email">
        Email
      </label>
      <Input name="email" placeholder="you@example.com" required />
      <label className="text-zinc-400" htmlFor="password">
        Password
      </label>
      <Input type="password" name="password" placeholder="••••••••" required />
      <Button type="submit" name="Log in" />
    </form>
  );
};

export default Login;
