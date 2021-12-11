import { Avatar, Flex, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { useGetUser } from "../query/hooks";

type Props = {};

const HeaderProfile = ({}: Props) => {
  const { data: user } = useGetUser();

  if (!user) {
    return null;
  }

  return (
    <NextLink href="/profile" passHref>
      <Flex as="a" alignItems="center">
        <Text fontWeight="bold" m={2}>
          {user.name ?? "No name"}
        </Text>
        <Avatar size="xs" src={user.image_url ?? undefined} name={user.name ?? user.email} />
      </Flex>
    </NextLink>
  );
};

export default HeaderProfile;
