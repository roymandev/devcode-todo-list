export const QUERY_KEYS = {
  all: ['activities'] as const,
  lists: () => [...QUERY_KEYS.all, 'list'] as const,
  list: (filter?: Record<string, unknown>) =>
    [...QUERY_KEYS.lists(), filter] as const,
  details: () => [...QUERY_KEYS.all, 'details'] as const,
  detail: (id: number) => [...QUERY_KEYS.details(), 'details', id] as const,
};
