import type { TodoPriority } from "../contant/options";

export type PayloadCreateTodo = {
  activity_group_id: number;
  title: string;
  priority?: TodoPriority;
};
export type ResCreateTodo = {
  is_active: boolean;
  created_at: string;
  updated_at: string;
  id: number;
  title: string;
  priority: TodoPriority;
  activity_group_id: number;
};

export type PayloadUpdateTodo = {
  activity_group_id: number;
  id: number;
  title?: string;
  is_active: boolean;
  priority?: TodoPriority;
};
export type ResUpdateTodo = {
  id: number;
  activity_group_id: number;
  title: string;
  is_active: boolean;
  priority: TodoPriority;
  created_at: string;
  updated_at: string;
};

export type PayloadApiRemoveTodo = {
  id: number;
  activity_group_id: number;
};
