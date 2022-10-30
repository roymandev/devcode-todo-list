import { SVGProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ChevronIconProps extends SVGProps<SVGSVGElement> {
  direction: 'top' | 'bottom' | 'left' | 'right';
}

const directionClass: Record<ChevronIconProps['direction'], string> = {
  top: 'rotate-180',
  left: 'rotate-90',
  right: '-rotate-90',
  bottom: '',
};

const ChevronIcon = ({
  direction = 'bottom',
  className,
  ...rest
}: ChevronIconProps) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={twMerge(directionClass[direction], className)}
    {...rest}
  >
    <path d="m6 9 6 6 6-6" stroke="#111" strokeLinecap="square" />
  </svg>
);

export default ChevronIcon;
