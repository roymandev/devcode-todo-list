import { atom } from 'jotai';

export interface Activity {
  id: number;
  email: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

// State
export const atomActivityList = atom<Activity[]>([]);
