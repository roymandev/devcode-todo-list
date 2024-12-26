import type { TodoPriority } from '../../todo/contant/options';

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

export type PayloadCreateActivity = {
  title: string;
  email?: string;
};
export type ResCreateActivity = {
  created_at: string;
  updated_at: string;
  id: number;
  title: string;
  email: string;
};

export type ResGetActivityDetail = {
  id: number;
  title: string;
  created_at: string;
  todo_items: {
    id: number;
    title: string;
    activity_group_id: number;
    is_active: boolean;
    priority: TodoPriority;
  }[];
};

export type PayloadUpdateActivity = {
  id: number;
  title: string;
};
