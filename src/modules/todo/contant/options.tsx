import {
  IconArrowsSort,
  IconSortAscending,
  IconSortAscendingLetters,
  IconSortDescending,
  IconSortDescendingLetters,
} from "@tabler/icons-react";

export const TODO_PRIORITIES = [
  "very-high",
  "high",
  "normal",
  "low",
  "very-low",
] as const;

export type TodoPriority = (typeof TODO_PRIORITIES)[number];

export const TODO_PRIORITY_OPTIONS: {
  label: string;
  value: TodoPriority;
  color: string;
}[] = [
  { label: "Very High", value: "very-high", color: "#ED4C5C" },
  { label: "High", value: "high", color: "#F8A541" },
  { label: "Medium", value: "normal", color: "#00A790" },
  { label: "Low", value: "low", color: "#428BC1" },
  { label: "Very Low", value: "very-low", color: "#8942C1" },
];

export const TODO_SORTS = [
  "latest",
  "oldest",
  "az",
  "za",
  "unfinished",
] as const;

export type TodoSort = (typeof TODO_SORTS)[number];

export const TODO_SORT_OPTIONS: {
  label: string;
  value: TodoSort;
  icon: JSX.Element;
}[] = [
  {
    icon: <IconSortDescending />,
    label: "Terbaru",
    value: "latest",
  },
  {
    icon: <IconSortAscending />,
    label: "Terlama",
    value: "oldest",
  },
  {
    icon: <IconSortAscendingLetters />,
    label: "A-Z",
    value: "az",
  },
  {
    icon: <IconSortDescendingLetters />,
    label: "Z-A",
    value: "za",
  },
  {
    icon: <IconArrowsSort />,
    label: "Belum Selesai",
    value: "unfinished",
  },
];
