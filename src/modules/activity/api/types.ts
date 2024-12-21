export type ResGetActivityList = {
  total: number;
  limit: number;
  skip: number;
  data: {
    id: number;
    title: string;
    created_at: string;
  }[];
};
