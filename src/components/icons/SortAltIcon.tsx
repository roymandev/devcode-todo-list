import { SVGProps } from 'react';

const SortAltIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m2.25 6.75 3-3m0 0 3 3m-3-3v10.5M15.75 11.25l-3 3m0 0-3-3m3 3V3.75"
      stroke="#16ABF8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SortAltIcon;
