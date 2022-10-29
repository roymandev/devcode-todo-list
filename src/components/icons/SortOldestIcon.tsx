import { SVGProps } from 'react';

const SortOldestIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 4.5h5.25M3 9h5.25M3 13.5h6.75M11.25 6.75 13.5 4.5l2.25 2.25M13.5 4.5v9"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SortOldestIcon;
