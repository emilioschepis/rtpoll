import { Box, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { useCreatedPolls } from "../query/hooks";

type Props = {};

const CreatedPolls = ({}: Props) => {
  const { isLoading, error, data: polls } = useCreatedPolls();

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (isLoading || !polls) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading as="h2">Created polls</Heading>
      {polls.map((poll) => (
        <Box key={poll.id}>
          <Text>{poll.title}</Text>
          {poll.description ? <Text>{poll.description}</Text> : null}
          <NextLink href={`/p/${poll.id}`} passHref>
            <Link>View</Link>
          </NextLink>
        </Box>
      ))}
      <NextLink href="/new" passHref>
        <Link>Create a new poll</Link>
      </NextLink>
    </Box>
  );
};

export default CreatedPolls;
