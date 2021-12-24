import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Fields = {
  email: string;
  password: string;
};
type Props = {
  onSubmit: (fields: Fields) => Promise<void>;
};

const DebugLoginForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Fields>();

  return (
    <Box padding={4} borderWidth={2} rounded="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Insert your email"
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

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Insert your password"
            {...register("password", {
              required: "This is required",
              min: {
                value: 6,
                message: "Provide a valid password",
              },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          width="full"
          fontSize="sm"
          textTransform="uppercase"
          fontWeight="bold"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
};

export default DebugLoginForm;
