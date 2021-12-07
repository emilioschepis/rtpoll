import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import CreatedPolls from "../src/components/CreatedPolls";
import { useRequiredAuth } from "../src/context/AuthContext";

const Home: NextPage = () => {
  const auth = useRequiredAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <Box>
      <Head>
        <title>RT Poll</title>
        <meta name="robots" content="all" />
      </Head>
      <Heading as="h1">RT Poll</Heading>
      <CreatedPolls />
    </Box>
  );
};

export default Home;
