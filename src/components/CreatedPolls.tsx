import { Box, Grid, Heading, Skeleton } from "@chakra-ui/react";

import { useCreatedPolls } from "../query/hooks";
import CreatedPollItem from "./CreatedPollItem";

type Props = {};

const CreatedPolls = ({}: Props) => {
  const { isLoading, error, data: polls } = useCreatedPolls();

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Box my={8}>
      <Heading as="h2" mb={4} fontSize="xl">
        Your polls
      </Heading>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
        {isLoading || !polls ? (
          <>
            <Skeleton height="100px" rounded="lg" />
            <Skeleton height="100px" rounded="lg" />
            <Skeleton height="100px" rounded="lg" />
            <Skeleton height="100px" rounded="lg" />
          </>
        ) : (
          polls.map((poll) => <CreatedPollItem key={poll.id} poll={poll} />)
        )}
      </Grid>
    </Box>
  );
};

export default CreatedPolls;
