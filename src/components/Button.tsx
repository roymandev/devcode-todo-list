import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import { cn } from '../libs/cn';

type Props = {
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined' | 'unstyled';
  leftIcon?: React.ReactNode;
  asChild?: boolean;
  loading?: boolean;
} & ComponentProps<'button'>;

export const Button = ({
  variant = 'primary',
  className,
  leftIcon,
  children,
  asChild,
  loading,
  disabled,
  ...rest
}: Props) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      className={cn(
        variant !== 'unstyled' &&
          'flex h-14 items-center justify-center gap-2 rounded-full px-7 font-semibold text-lg disabled:opacity-80',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-gray-100 text-gray-700',
        variant === 'danger' && 'bg-red text-white',
        leftIcon && 'pl-6',
        className,
      )}
      disabled={loading || disabled}
      {...rest}
    >
      {leftIcon}
      {children}
    </Comp>
  );
};
