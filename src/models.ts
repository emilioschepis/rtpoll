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

export type IUsePoll = {
  id: string;
  title: string;
  description: string | null;
  choices: {
    id: string;
    title: string;
  }[];
};
