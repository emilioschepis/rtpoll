import { Avatar, Box, Spinner, Text } from "@chakra-ui/react";

import { useGuaranteedUser } from "../context/AuthContext";
import { useWatchUser } from "../query/hooks";
import supabase from "../supabase";
import ProfileForm from "./forms/ProfileForm";

type Props = {};

const Profile = ({}: Props) => {
  const { id } = useGuaranteedUser();
  const { isLoading, error, data: user } = useWatchUser();

  async function submit(name: string | null, files: File[] | null) {
    let newImageUrl: string | null = null;

    if (files && files.length === 1) {
      const file = files[0];
      const now = new Date().getTime().toString();
      const extension = file.name.split(".").pop();
      const filename = `profile-${now}.${extension}`;

      const { error, data } = await supabase.storage.from("profile-images").upload(`${id}/${filename}`, file);

      if (error || !data) {
        return;
      }

      newImageUrl = supabase.storage.from("profile-images").getPublicUrl(`${id}/${filename}`).publicURL;
    }

    await supabase
      .from("users")
      .update({ name: name ?? undefined, image_url: newImageUrl ?? undefined })
      .eq("id", id);
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (isLoading || !user) {
    return <Spinner />;
  }

  return (
    <Box>
      <Avatar src={user.image_url ?? undefined} name={user.name ?? user.email} />
      <Text>{user.name ?? user.email}</Text>
      <ProfileForm currentName={user.name} onSubmit={async ({ name, files }) => await submit(name, files)} />
    </Box>
  );
};

export default Profile;
