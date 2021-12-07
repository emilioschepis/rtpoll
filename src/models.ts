export type IChoicesTable = {
  id: string;
  poll_id: string;
  title: string;
};

export type IPollTable = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
};

export type IVotesTable = {
  voter_id: string;
  choice_id: string;
  poll_id: string;
  created_at: string;
};

export type IUseCreatedPolls = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  votes: { voter_id: string }[];
}[];

export type IUsePoll = {
  id: string;
  title: string;
  description: string | null;
  choices: {
    id: string;
    title: string;
  }[];
};

export type IUseVotedPolls = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  votes: { voter_id: string }[];
}[];

export type IUseWatchUser = {
  email: string;
  name: string | null;
  image_url: string | null;
};

export type IUseWatchVotes = {
  choice_id: string;
  voter: {
    id: string;
    email: string;
    name: string | null;
    image_url: string | null;
  };
}[];
