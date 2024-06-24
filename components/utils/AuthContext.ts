import { Session } from "@supabase/supabase-js";
import { createContext } from "react";

type AuthContextType = {
  session: Session | null;
};

export const AuthContext = createContext<AuthContextType>({
  session: null,
});
