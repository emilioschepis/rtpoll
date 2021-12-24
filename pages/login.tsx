import { Alert, AlertDescription, AlertIcon, Box, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import DebugLoginForm from "../src/components/forms/DebugLoginForm";
import LoginForm from "../src/components/forms/LoginForm";
import useLogin from "../src/hooks/useLogin";
import supabase from "../src/supabase";

const Login: NextPage = () => {
  const router = useRouter();
  const [state, dispatch] = useLogin();

  async function login(email: string) {
    const { error } = await supabase.auth.signIn({ email });

    if (error) {
      dispatch({ type: "setFailed", payload: { error: error.message } });
    } else {
      dispatch({ type: "setSuccessful", payload: { message: "Please check your email for a confirmation link" } });
    }
  }

  async function debugLogin(email: string, password: string) {
    if (process.env.NODE_ENV !== "development") {
      throw new Error("Debug login is only enabled in development mode");
    }

    const { error } = await supabase.auth.signIn({ email, password });

    if (error) {
      // eslint-disable-next-line no-console
      console.warn("Error during login:", error);
    } else {
      router.replace("/");
    }
  }

  return (
    <Box padding={4}>
      <Head>
        <title>Login &mdash; RT Poll</title>
        <meta name="robots" content="all" />
      </Head>
      {state.error ? (
        <Alert status="error" mb={4} rounded="lg">
          <AlertIcon />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : state.message ? (
        <Alert status="success" mb={4} rounded="lg">
          <AlertIcon />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
      <Heading as="h1">Welcome</Heading>
      <Text my={4} fontWeight="semibold">
        Start creating and sharing polls with friends and family, seeing the results in real time!
      </Text>

      {process.env.NODE_ENV === "development" ? (
        <DebugLoginForm onSubmit={async ({ email, password }) => await debugLogin(email, password)} />
      ) : (
        <LoginForm onSubmit={async ({ email }) => await login(email)} />
      )}
    </Box>
  );
};

export default Login;
