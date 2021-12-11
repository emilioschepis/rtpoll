import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Fields = {
  name: string | null;
  files: File[] | null;
};
type Props = {
  currentName: string | null;
  onSubmit: (fields: Fields) => Promise<void>;
};

const ProfileForm = ({ currentName, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({ defaultValues: { name: currentName } });

  return (
    <Box padding={4} borderWidth={2} rounded="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Public name</FormLabel>
            <Input
              id="name"
              placeholder="Insert your name"
              {...register("name", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.files}>
            <FormLabel htmlFor="files">Profile picture</FormLabel>
            <Input id="files" placeholder="files" type="file" accept="image/*" {...register("files", {})} />
          </FormControl>
        </VStack>
        <Button width="full" mt={4} isLoading={isSubmitting} type="submit">
          Update your profile
        </Button>
      </form>
    </Box>
  );
};

export default ProfileForm;
