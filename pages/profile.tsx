import { Box, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import Profile from "../src/components/Profile";
import { useRequiredAuth } from "../src/context/AuthContext";

const ProfilePage: NextPage = () => {
  const auth = useRequiredAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <Box>
      <Head>
        <title>Your profile &mdash; RT Poll</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Heading as="h1">Your profile</Heading>
      <Profile />
    </Box>
  );
};

export default ProfilePage;
