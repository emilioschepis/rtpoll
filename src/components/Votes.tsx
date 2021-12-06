import { Avatar, Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";

import { useGuaranteedUser } from "../context/AuthContext";
import { IUsePoll } from "../models";
import { useVote, useWatchVotes } from "../query/hooks";

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
    <Flex>
      {choices.map((choice) => {
        const votesForChoice = votes?.filter((vote) => vote.choice_id === choice.id) ?? [];
        const isCurrentUserChoice = votesForChoice.find((vote) => vote.voter.id === user.id) !== undefined;

        return (
          <Skeleton key={choice.id} isLoaded={!isLoading}>
            <Flex direction="column">
              <Text>{choice.title}</Text>
              <Text>{votesForChoice.length} votes</Text>
              {votesForChoice.map((vote) => (
                <Avatar
                  key={vote.voter.email}
                  name={vote.voter.name ?? vote.voter.email}
                  src={vote.voter.image_url ?? undefined}
                />
              ))}
              <Button
                isLoading={isVoting && variables === choice.id}
                disabled={isCurrentUserChoice}
                onClick={() => vote(choice.id)}
              >
                Vote for this
              </Button>
            </Flex>
          </Skeleton>
        );
      })}
    </Flex>
  );
};

export default Votes;
