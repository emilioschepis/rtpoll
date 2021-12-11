import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Poll from "../../src/components/Poll";
import { useRequiredAuth } from "../../src/context/AuthContext";

const PollPage: NextPage = () => {
  const router = useRouter();
  const auth = useRequiredAuth();

  const pollId = router.query.pollId as string;

  if (!auth.user || !pollId) {
    return null;
  }

  return (
    <Box padding={4}>
      <Head>
        <title key="poll-title">Poll &mdash; RT Poll</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Poll pollId={pollId} />
    </Box>
  );
};

export default PollPage;
