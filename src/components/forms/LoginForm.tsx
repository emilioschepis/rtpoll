import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Fields = {
  email: string;
};
type Props = {
  onSubmit: (fields: Fields) => Promise<void>;
};

const LoginForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Fields>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="email"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Provide a valid email",
            },
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
