import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";

import Profile from "../src/components/Profile";
import { useRequiredAuth } from "../src/context/AuthContext";

const ProfilePage: NextPage = () => {
  const auth = useRequiredAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <Box>
      <Profile />
    </Box>
  );
};

export default ProfilePage;
