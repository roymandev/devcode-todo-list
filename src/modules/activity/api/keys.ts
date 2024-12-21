export const QUERY_KEYS = {
  all: ['activities'] as const,
  lists: () => [...QUERY_KEYS.all, 'list'] as const,
  list: (filter?: Record<string, unknown>) =>
    [...QUERY_KEYS.lists(), filter] as const,
};
