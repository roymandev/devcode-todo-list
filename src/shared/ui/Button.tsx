import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import { cn } from '../lib';

type Props = {
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined' | 'unstyled';
  leftIcon?: React.ReactNode;
  asChild?: boolean;
} & ComponentProps<'button'>;

export const Button = ({
  variant = 'primary',
  className,
  leftIcon,
  children,
  asChild,
  ...rest
}: Props) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      className={cn(
        variant !== 'unstyled' &&
          'flex h-14 items-center gap-2 rounded-full px-7 font-semibold text-lg',
        variant === 'primary' && 'bg-primary text-white',
        leftIcon && 'pl-6',
        className,
      )}
      {...rest}
    >
      {leftIcon}
      {children}
    </Comp>
  );
};
