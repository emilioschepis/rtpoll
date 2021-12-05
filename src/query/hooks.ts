import { PostgrestError } from "@supabase/postgrest-js";
import { useQuery } from "react-query";

import { IPoll } from "../models";
import supabase from "../supabase";

enum Key {
  GET_POLL = "GET_POLL",
}

export const usePoll = (id: string) =>
  useQuery<IPoll | null, PostgrestError>(Key.GET_POLL, async () => {
    const { data, error } = await supabase.from<IPoll>("polls").select("*").eq("id", id).maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  });
