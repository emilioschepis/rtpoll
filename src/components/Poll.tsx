import { Box, Spinner } from "@chakra-ui/react";

import { usePoll } from "../query/hooks";

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
      <pre>{JSON.stringify(poll, null, 2)}</pre>
    </Box>
  );
};

export default Poll;
