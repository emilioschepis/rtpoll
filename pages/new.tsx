import { Alert, AlertDescription, AlertIcon, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import NewForm from "../src/components/forms/NewForm";
import { useRequiredAuth } from "../src/context/AuthContext";
import supabase from "../src/supabase";
import { generateId } from "../src/utils/generateId";

const NewPage: NextPage = () => {
  const router = useRouter();
  const auth = useRequiredAuth();
  const [error, setError] = useState<string | null>(null);

  async function submit(title: string, description: string | null, choices: { title: string }[]) {
    setError(null);

    const randomId = generateId();
    const { error } = await supabase.from("polls").insert({ id: randomId, user_id: auth.user!.id, title, description });

    if (error) {
      setError(error.message);
      return;
    }

    const { error: choicesError } = await supabase
      .from("choices")
      .upsert(choices.map((choice) => ({ poll_id: randomId, title: choice.title })));

    if (choicesError) {
      setError(choicesError.message);
      return;
    }

    router.push("/p/" + randomId);
  }

  if (!auth.user) {
    return null;
  }

  return (
    <Box>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <NewForm
        onSubmit={async ({ title, description, choices }) => await submit(title, description ?? null, choices)}
      />
    </Box>
  );
};

export default NewPage;