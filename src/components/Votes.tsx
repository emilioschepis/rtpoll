import { Avatar, AvatarGroup, Box, Button, Flex, Grid, Skeleton, Text } from "@chakra-ui/react";

import { useGuaranteedUser } from "../context/AuthContext";
import { IUsePoll } from "../models";
import { useVote, useWatchVotes } from "../query/hooks";
import Icon from "./core/Icon";

type Props = {
  pollId: string;
  choices: IUsePoll["choices"];
};

const Votes = ({ pollId, choices }: Props) => {
  const user = useGuaranteedUser();
  const { isLoading, error, data: votes } = useWatchVotes(pollId);
  const { mutate: vote, isLoading: isVoting, variables } = useVote(pollId);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap={4}>
      {choices.map((choice) => {
        const votesForChoice = votes?.filter((vote) => vote.choice_id === choice.id) ?? [];
        const isCurrentUserChoice = votesForChoice.find((vote) => vote.voter.id === user.id) !== undefined;
        const votePercentage = votes && votes.length > 0 ? votesForChoice.length / votes.length : 0;

        return (
          <Skeleton key={choice.id} isLoaded={!isLoading}>
            <Flex position="relative" direction="column" padding={4} rounded="lg" bg="gray.700" overflow="hidden">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="bold" mb={4} zIndex={1}>
                  {choice.title}
                </Text>
                <Text fontWeight="bold" mb={4} zIndex={1}>
                  {votePercentage * 100}%
                </Text>
              </Flex>
              <AvatarGroup zIndex={1}>
                {votesForChoice.length > 0 ? (
                  votesForChoice.map((vote) => (
                    <Avatar
                      key={vote.voter.email}
                      name={vote.voter.name ?? vote.voter.email}
                      src={vote.voter.image_url ?? undefined}
                    />
                  ))
                ) : (
                  <Text zIndex={1}>No votes for this choice yet.</Text>
                )}
              </AvatarGroup>

              <Box mt={4} borderTopWidth={2} pt={4}>
                {isCurrentUserChoice ? (
                  <Text zIndex={1}>You voted for this option</Text>
                ) : (
                  <Button
                    aria-label={`Vote for "${choice.title}"`}
                    width="full"
                    bg="cyan.400"
                    color="white"
                    isLoading={isVoting && variables === choice.id}
                    disabled={isCurrentUserChoice}
                    onClick={() => vote(choice.id)}
                    leftIcon={<Icon name="bolt" />}
                    zIndex={1}
                    _hover={{
                      bg: "cyan.300",
                    }}
                  >
                    Vote
                  </Button>
                )}
              </Box>
              <Box
                position="absolute"
                backgroundColor="cyan.400"
                opacity="15%"
                inset={0}
                width={`${votePercentage * 100}%`}
              />
            </Flex>
          </Skeleton>
        );
      })}
    </Grid>
  );
};

export default Votes;
