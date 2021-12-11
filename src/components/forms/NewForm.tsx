import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";

import Icon from "../core/Icon";

type Fields = {
  title: string;
  description?: string;
  choices: { title: string }[];
};
type Props = {
  onSubmit: (fields: Fields) => Promise<void>;
};

const NewForm = ({ onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({ defaultValues: { choices: [{ title: "" }, { title: "" }] } });
  const { fields, append, remove } = useFieldArray({ control, name: "choices" });

  return (
    <Box padding={4} borderWidth={2} rounded="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              placeholder="Choose a title"
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
            <Input id="description" placeholder="Optionally choose a description" {...register("description", {})} />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          {fields.map((_, index) => (
            <FormControl key={index.toString()} isInvalid={Boolean(errors?.choices?.[index])}>
              <FormLabel htmlFor={`choices.${index}`}>Choice {index + 1}</FormLabel>
              <Flex>
                <Input
                  id={`choices.${index}`}
                  placeholder="Insert a value"
                  {...register(`choices.${index}.title`, {
                    required: "This is required",
                    min: {
                      value: 3,
                      message: "Use a longer title",
                    },
                  })}
                />
                {fields.length > 2 && (
                  <IconButton
                    aria-label="remove choice"
                    variant="outline"
                    icon={<Icon name="trash" />}
                    disabled={isSubmitting}
                    onClick={() => remove(index)}
                    ml={2}
                  />
                )}
              </Flex>

              <FormErrorMessage>{errors.choices?.[index]?.title?.message}</FormErrorMessage>
            </FormControl>
          ))}
        </VStack>
        <Button
          variant="outline"
          width="full"
          mt={4}
          disabled={isSubmitting}
          onClick={() => append({ title: "" })}
          leftIcon={<Icon name="plus" />}
        >
          Add choice
        </Button>
        <Button width="full" mt={4} isLoading={isSubmitting} type="submit">
          Create new poll
        </Button>
      </form>
    </Box>
  );
};

export default NewForm;
