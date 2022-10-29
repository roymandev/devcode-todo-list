import { SVGProps } from 'react';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.75 9 3.75 3.75 7.5-7.5"
      stroke="#4A4A4A"
      strokeLinecap="square"
    />
  </svg>
);

export default CheckIcon;
