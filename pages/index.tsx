import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";

import Icon from "../src/components/core/Icon";
import CreatedPolls from "../src/components/CreatedPolls";
import VotedPolls from "../src/components/VotedPolls";
import { useRequiredAuth } from "../src/context/AuthContext";

const Home: NextPage = () => {
  const auth = useRequiredAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <Box padding={4}>
      <Head>
        <title>RT Poll</title>
        <meta name="robots" content="all" />
      </Head>
      <Heading as="h1">Dashboard</Heading>
      <NextLink href="/new" passHref>
        <Flex
          as="a"
          padding={4}
          my={4}
          borderRadius="lg"
          bg="gray.700"
          alignItems="center"
          shadow="lg"
          _hover={{ bg: "gray.600", color: "cyan.400" }}
        >
          <Icon name="plus" />
          <Text ml={1} fontSize="xl" fontWeight="bold">
            Create a new poll
          </Text>
        </Flex>
      </NextLink>
      <CreatedPolls />
      <VotedPolls />
    </Box>
  );
};

export default Home;
