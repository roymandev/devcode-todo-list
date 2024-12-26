export const TODO_PRIORITIES = [
  'very-high',
  'high',
  'normal',
  'low',
  'very-low',
] as const;

export type TodoPriority = (typeof TODO_PRIORITIES)[number];

export const TODO_PRIORITY_OPTIONS: {
  label: string;
  value: (typeof TODO_PRIORITIES)[number];
  color: string;
}[] = [
  { label: 'Very High', value: 'very-high', color: '#ED4C5C' },
  { label: 'High', value: 'high', color: '#F8A541' },
  { label: 'Medium', value: 'normal', color: '#00A790' },
  { label: 'Low', value: 'low', color: '#428BC1' },
  { label: 'Very Low', value: 'very-low', color: '#8942C1' },
];
