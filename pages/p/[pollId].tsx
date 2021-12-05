import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
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
    <Box>
      <Poll pollId={pollId} />
    </Box>
  );
};

export default PollPage;
