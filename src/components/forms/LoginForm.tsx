import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Icon from "../core/Icon";

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
          <FormHelperText>Insert your email address to receive a magic link. No password required.</FormHelperText>

          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <Button
          width="full"
          fontSize="sm"
          textTransform="uppercase"
          fontWeight="bold"
          mt={4}
          isLoading={isSubmitting}
          type="submit"
          leftIcon={<Icon name="sparkle" />}
        >
          Get magic link
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
