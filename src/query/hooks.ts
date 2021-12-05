import { PostgrestError } from "@supabase/postgrest-js";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import { IUsePoll, IUseWatchVotes } from "../models";
import supabase from "../supabase";

enum Key {
  GET_POLL = "GET_POLL",
  WATCH_VOTES = "WATCH_VOTES",
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

export const useWatchVotes = (pollId: string) => {
  const queryClient = useQueryClient();
  const query = useQuery<IUseWatchVotes, PostgrestError>([Key.WATCH_VOTES, pollId], async () => {
    const { data, error } = await supabase
      .from("votes")
      .select("choice_id, voter:users (email, name, image_url)")
      .eq("poll_id", pollId);

    if (error) {
      throw error;
    }

    return data ?? [];
  });

  useEffect(() => {
    const subscription = supabase
      .from("votes:poll_id=eq." + pollId)
      .on("*", (_) => {
        queryClient.invalidateQueries([Key.WATCH_VOTES, pollId]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [pollId, queryClient]);

  return query;
};
