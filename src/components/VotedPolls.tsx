import { Box, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { useVotedPolls } from "../query/hooks";

type Props = {};

const VotedPolls = ({}: Props) => {
  const { isLoading, error, data: polls } = useVotedPolls();

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (isLoading || !polls) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading as="h2">Voted polls</Heading>
      {polls.map((poll) => (
        <Box key={poll.id}>
          <Text>{poll.title}</Text>
          {poll.description ? <Text>{poll.description}</Text> : null}
          <NextLink href={`/p/${poll.id}`} passHref>
            <Link>View</Link>
          </NextLink>
        </Box>
      ))}
    </Box>
  );
};

export default VotedPolls;
