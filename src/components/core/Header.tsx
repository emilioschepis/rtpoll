import { Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import { useAuth } from "../../context/AuthContext";
import HeaderProfile from "../HeaderProfile";

type Props = {};

const Header = ({}: Props) => {
  const auth = useAuth();

  return (
    <Flex
      w="full"
      height={16}
      padding={4}
      justifyContent="space-between"
      alignItems="center"
      bg="gray.900"
      borderBottomWidth={2}
    >
      <NextLink href="/" passHref>
        <Link fontSize="2xl" fontWeight="bold">
          RT Poll
        </Link>
      </NextLink>
      {auth.user ? <HeaderProfile /> : null}
    </Flex>
  );
};

export default Header;
