import { PostgrestError } from "@supabase/postgrest-js";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useGuaranteedUser } from "../context/AuthContext";
import { IUseCreatedPolls, IUsePoll, IUseVotedPolls, IUseWatchUser, IUseWatchVotes } from "../models";
import supabase from "../supabase";

enum Key {
  // Queries
  CREATED_POLLS = "CREATED_POLLS",
  GET_POLL = "GET_POLL",
  GET_USER = "GET_USER",
  VOTED_POLLS = "VOTED_POLLS",
  WATCH_USER = "WATCH_USER",
  WATCH_VOTES = "WATCH_VOTES",

  // Mutations
  VOTE = "VOTE",
}

export const useCreatedPolls = () => {
  const user = useGuaranteedUser();
  return useQuery<IUseCreatedPolls | null, PostgrestError>([Key.CREATED_POLLS], async () => {
    const { data, error } = await supabase
      .from("polls")
      .select("id, title, description, created_at, votes (voter_id)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  });
};

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

export const useVote = (pollId: string) => {
  const user = useGuaranteedUser();
  const mutation = useMutation<void, PostgrestError, string>([Key.VOTE, pollId], async (choiceId) => {
    const { error } = await supabase.from("votes").upsert({ voter_id: user.id, choice_id: choiceId, poll_id: pollId });

    if (error) {
      throw error;
    }
  });

  return mutation;
};

export const useVotedPolls = () => {
  const user = useGuaranteedUser();
  return useQuery<IUseVotedPolls | null, PostgrestError>([Key.VOTED_POLLS], async () => {
    const { data, error } = await supabase
      .from("polls")
      .select("id, title, description, created_at, votes (voter_id)")
      .neq("user_id", user.id)
      .eq("votes.voter_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  });
};

export const useGetUser = () => {
  const user = useGuaranteedUser();

  return useQuery<IUseWatchUser | null, PostgrestError>([Key.WATCH_USER, user.id], async () => {
    const { data, error } = await supabase
      .from("users")
      .select("email, name, image_url")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  });
};

export const useWatchUser = () => {
  const user = useGuaranteedUser();
  const queryClient = useQueryClient();
  const query = useQuery<IUseWatchUser | null, PostgrestError>([Key.WATCH_USER, user.id], async () => {
    const { data, error } = await supabase
      .from("users")
      .select("email, name, image_url")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  });

  useEffect(() => {
    const subscription = supabase
      .from("users:id=eq." + user.id)
      .on("*", (_) => {
        queryClient.invalidateQueries([Key.WATCH_USER, user.id]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, queryClient]);

  return query;
};

export const useWatchVotes = (pollId: string) => {
  const queryClient = useQueryClient();
  const query = useQuery<IUseWatchVotes, PostgrestError>([Key.WATCH_VOTES, pollId], async () => {
    const { data, error } = await supabase
      .from("votes")
      .select("choice_id, voter:users (id, email, name, image_url)")
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
