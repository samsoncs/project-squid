import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import Button from "./Button";
import Input from "./form/Input";
import { AuthError } from "@supabase/auth-js";

const supabase = createClient();

const Login = () => {
  const [authError, setAuthError] = useState<AuthError | null>(null);

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
      setAuthError(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-96 flex-col px-2">
      <label className="text-zinc-400" htmlFor="email">
        Email
      </label>
      <Input name="email" placeholder="you@example.com" required />
      <label className="text-zinc-400" htmlFor="password">
        Password
      </label>
      <Input type="password" name="password" placeholder="••••••••" required />
      <Button type="submit" name="Log in" />
      {authError && <span className="text-red-500"> {authError.message} </span>}
    </form>
  );
};

export default Login;
