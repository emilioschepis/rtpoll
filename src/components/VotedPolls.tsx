import { Box, Grid, Heading, Link, Skeleton, Spinner, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { useVotedPolls } from "../query/hooks";
import VotedPollItem from "./VotedPollItem";

type Props = {};

const VotedPolls = ({}: Props) => {
  const { isLoading, error, data: polls } = useVotedPolls();

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Box my={8}>
      <Heading as="h2" mb={4} fontSize="xl">
        Polls you voted on
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
          polls.map((poll) => <VotedPollItem key={poll.id} poll={poll} />)
        )}
      </Grid>
    </Box>
  );
};

export default VotedPolls;
