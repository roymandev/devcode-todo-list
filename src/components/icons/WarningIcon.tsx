import { SVGProps } from 'react';

const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={84}
    height={84}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M42 52.5v.035M42 31.5v7-7ZM17.5 66.501h49a7 7 0 0 0 6.44-9.625L48.09 14.001a7 7 0 0 0-12.25 0L10.99 56.876a7 7 0 0 0 6.125 9.625"
      stroke="#ED4C5C"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WarningIcon;
