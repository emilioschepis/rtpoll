import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react";
import type { NextPage } from "next";

import LoginForm from "../src/components/forms/LoginForm";
import useLogin from "../src/hooks/useLogin";
import supabase from "../src/supabase";

const Login: NextPage = () => {
  const [state, dispatch] = useLogin();

  async function login(email: string) {
    const { error } = await supabase.auth.signIn({ email });

    if (error) {
      dispatch({ type: "setFailed", payload: { error: error.message } });
    } else {
      dispatch({ type: "setSuccessful", payload: { message: "Please check your email for a confirmation link" } });
    }
  }

  return (
    <Box>
      {state.error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : state.message ? (
        <Alert status="success">
          <AlertIcon />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
      <LoginForm onSubmit={async ({ email }) => await login(email)} />
    </Box>
  );
};

export default Login;
