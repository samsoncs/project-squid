import { createClient } from "@/utils/supabase/client";
import { FormEvent } from "react";

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
    <form onSubmit={onSubmit} className="flex flex-col w-96">
      <label className="text-zinc-400" htmlFor="email">
        Email
      </label>
      <input
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-zinc-400" htmlFor="password">
        Password
      </label>
      <input
        className="bg-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 rounded-md px-4 py-2 mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button
        className="p-4 text-zinc-400 text-lg bg-zinc-800 rounded-md"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
};

export default Login;
