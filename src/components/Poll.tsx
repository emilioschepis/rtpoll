import { Box, Heading, Spinner } from "@chakra-ui/react";

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
    return <Spinner />;
  }

  if (!poll) {
    return <Box>404</Box>;
  }

  return (
    <Box>
      <Heading as="h1">{poll.title}</Heading>
      <Votes pollId={id} choices={poll.choices} />
    </Box>
  );
};

export default Poll;
