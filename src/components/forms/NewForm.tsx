import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";

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
      {fields.map((_, index) => (
        <FormControl key={index.toString()} isInvalid={Boolean(errors?.choices?.[index])}>
          <FormLabel htmlFor={`choices.${index}`}>Choice #{index + 1}</FormLabel>
          <Input
            id={`choices.${index}`}
            placeholder={`choice #${index + 1}`}
            {...register(`choices.${index}.title`, {
              required: "This is required",
              min: {
                value: 3,
                message: "Use a longer title",
              },
            })}
          />
          <FormErrorMessage>{errors.choices?.[index]?.title?.message}</FormErrorMessage>
        </FormControl>
      ))}
      <Button mt={4} disaabled={isSubmitting} onClick={() => append({ title: "" })}>
        Add option
      </Button>
      <Button mt={4} disabled={isSubmitting || fields.length <= 2} onClick={() => remove(fields.length - 1)}>
        Remove option
      </Button>
      <Button mt={4} isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default NewForm;
