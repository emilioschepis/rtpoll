import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";

import { useRequiredAuth } from "../src/context/AuthContext";

const Home: NextPage = () => {
  const auth = useRequiredAuth();

  if (!auth.user) {
    return null;
  }

  return <Box></Box>;
};

export default Home;
