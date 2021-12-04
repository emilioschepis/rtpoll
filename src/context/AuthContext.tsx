import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";

import supabase from "../supabase";

type State = { loading: boolean; user: User | null };
type Action = { type: "setAuthenticated"; payload: { user: User } } | { type: "setUnauthenticated" };

const initialState: State = { loading: true, user: null };

function reducer(_: State, action: Action): State {
  switch (action.type) {
    case "setAuthenticated":
      return { loading: false, user: action.payload.user };
    case "setUnauthenticated":
      return { loading: false, user: null };
  }
}

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Immediately check for the authentication status
    const user = supabase.auth.user();
    if (user) {
      dispatch({ type: "setAuthenticated", payload: { user } });
    } else if (localStorage.getItem("supabase.auth.token")) {
      // An authentication token is available but the user is not defined yet.
      // The authentication status will be set by the `onAuthStateChange` subscription.
      // https://github.com/supabase/gotrue-js/issues/143
    } else {
      dispatch({ type: "setUnauthenticated" });
    }

    // Subscribe to authentication changes (sign-outs, magic link sign-ins)
    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      const user = session?.user;
      if (user) {
        dispatch({ type: "setAuthenticated", payload: { user } });
      } else {
        dispatch({ type: "setUnauthenticated" });
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return auth;
}

export function useRequiredAuth({ redirectTo }: { redirectTo: string } = { redirectTo: "/login" }) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.user) {
      router.replace(redirectTo);
    }
  }, [auth, redirectTo, router]);

  return auth;
}

export function useGuaranteedUser(): User {
  const auth = useAuth();

  if (!auth.user) {
    throw new Error("No user is currently signed in");
  }

  return auth.user;
}

export default AuthProvider;
