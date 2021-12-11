import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";

import { IUseVotedPolls } from "../models";
import Icon from "./core/Icon";

type Props = {
  poll: IUseVotedPolls[number];
};

const VotedPollItem = ({ poll }: Props) => {
  return (
    <NextLink href={`/p/${poll.id}`} passHref>
      <Box as="a" padding={4} borderRadius="lg" bg="gray.700" shadow="lg" _hover={{ bg: "gray.600" }}>
        <GridItem h="full">
          <Flex h="full" direction="column" justifyContent="space-between">
            <Box>
              <Heading as="h3" fontSize="xl">
                {poll.title}
              </Heading>
              <Text>{dayjs().to(poll.created_at)}</Text>
              {poll.description ? (
                <Text fontStyle="italic" fontSize="sm">
                  &ldquo;{poll.description}&rdquo;
                </Text>
              ) : null}
            </Box>
            <Flex alignItems="center" mt={4} pt={4} borderTopWidth={2}>
              <Icon name="bars" />
              <Text ml={1}>{poll.votes.length} votes</Text>
            </Flex>
          </Flex>
        </GridItem>
      </Box>
    </NextLink>
  );
};

export default VotedPollItem;
