import { SVGProps } from 'react';

const CaretLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.667 12 8 8M3.667 12l8-8"
      stroke="#111"
      strokeWidth={5}
      strokeLinecap="square"
    />
  </svg>
);

export default CaretLeftIcon;
