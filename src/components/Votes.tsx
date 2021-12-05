import { Avatar, Box, Flex, Skeleton, Text } from "@chakra-ui/react";

import { IUsePoll } from "../models";
import { useWatchVotes } from "../query/hooks";

type Props = {
  pollId: string;
  choices: IUsePoll["choices"];
};

const Votes = ({ pollId, choices }: Props) => {
  const { isLoading, error, data: votes } = useWatchVotes(pollId);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Flex>
      {choices.map((choice) => {
        const votesForChoice = votes?.filter((vote) => vote.choice_id === choice.id) ?? [];

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
            </Flex>
          </Skeleton>
        );
      })}
    </Flex>
  );
};

export default Votes;
