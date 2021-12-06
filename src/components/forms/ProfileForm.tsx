import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" placeholder="name" {...register("name", {})} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.files}>
        <FormLabel htmlFor="files">Files</FormLabel>
        <Input id="files" placeholder="files" type="file" accept="image/*" {...register("files", {})} />
      </FormControl>
      <Button mt={4} isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ProfileForm;
