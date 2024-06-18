import { createClient } from "@/utils/supabase/client";
import { FormEvent } from "react";

const Login = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // TODO: Redirect to error page
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-96">
      <label htmlFor="email">Email</label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
