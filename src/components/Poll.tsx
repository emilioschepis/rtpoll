import { Box, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";

import { usePoll } from "../query/hooks";
import Votes from "./Votes";

type Props = {
  pollId: string;
};

const Poll = ({ pollId: id }: Props) => {
  const { isLoading, error, data: poll } = usePoll(id);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (isLoading) {
    return null;
  }

  if (!poll) {
    return <Box>404</Box>;
  }

  return (
    <Box>
      <Head>
        <title key="poll-title">{poll.title} &mdash; RT Poll</title>
      </Head>
      <Heading as="h1" mb={4}>
        {poll.title}
      </Heading>
      {poll.description ? (
        <Heading as="h2" mb={4} fontSize="xl">
          {poll.description}
        </Heading>
      ) : null}
      <Votes pollId={id} choices={poll.choices} />
    </Box>
  );
};

export default Poll;
