import { PostgrestError } from "@supabase/postgrest-js";
import { useQuery } from "react-query";

import { IUsePoll } from "../models";
import supabase from "../supabase";

enum Key {
  GET_POLL = "GET_POLL",
}

export const usePoll = (id: string) =>
  useQuery<IUsePoll | null, PostgrestError>([Key.GET_POLL, id], async () => {
    const { data, error } = await supabase
      .from("polls")
      .select("id, title, description, choices!fk_poll (id, title)")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  });
