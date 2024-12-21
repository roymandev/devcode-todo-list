import type { DefaultError, UseMutationOptions } from '@tanstack/react-query';

type AdaptedMutationOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<
    TData,
    TError,
    TVariables extends undefined ? void : TVariables,
    TContext
  >;

export const mutationOptions = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): AdaptedMutationOptions<TData, TError, TVariables, TContext> =>
  options as AdaptedMutationOptions<TData, TError, TVariables, TContext>;
