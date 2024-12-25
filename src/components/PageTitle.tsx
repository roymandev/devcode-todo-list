import type { ComponentProps } from 'react';
import { cn } from '../libs/cn';

export type PageTitleProps = {
  children: string;
  'data-cy': string;
  className?: string;
} & Omit<ComponentProps<'h2'>, 'children'>;

export const PageTitle = ({ className, ...rest }: PageTitleProps) => (
  <h2 className={cn('font-bold text-4xl', className)} {...rest} />
);
