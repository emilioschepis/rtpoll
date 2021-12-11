import { Alert, AlertDescription, AlertIcon, Box, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

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
      <LoginForm onSubmit={async ({ email }) => await login(email)} />
    </Box>
  );
};

export default Login;
