import { SVGProps } from 'react';

const SortIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3 9 4-4m0 0 4 4M7 5v14M21 15l-4 4m0 0-4-4m4 4V5"
      stroke="#888"
      strokeWidth={1.5}
      strokeLinecap="square"
    />
  </svg>
);

export default SortIcon;
