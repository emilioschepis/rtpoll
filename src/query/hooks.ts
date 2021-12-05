import { PostgrestError } from "@supabase/postgrest-js";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import { IPoll } from "../models";
import supabase from "../supabase";

enum Key {
  GET_POLL = "GET_POLL",
}

export const usePoll = (id: string) =>
  useQuery<IPoll | null, PostgrestError>([Key.GET_POLL, id], async () => {
    const { data, error } = await supabase.from<IPoll>("polls").select("*").eq("id", id).maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  });

export const useRTPoll = (id: string) => {
  const query = usePoll(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = supabase
      .from<IPoll>(`polls:id=eq.${id}`)
      .on("UPDATE", (payload) => {
        queryClient.setQueryData([Key.GET_POLL, id], payload.new);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [id, queryClient]);

  return query;
};
