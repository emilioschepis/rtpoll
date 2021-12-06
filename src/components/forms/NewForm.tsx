import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Fields = {
  title: string;
  description?: string;
};
type Props = {
  onSubmit: (fields: Fields) => Promise<void>;
};

const NewForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Fields>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="title"
          {...register("title", {
            required: "This is required",
            min: {
              value: 3,
              message: "Use a longer title",
            },
          })}
        />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input id="description" placeholder="description" {...register("description", {})} />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default NewForm;
