import { SVGProps } from 'react';

const CheckAltIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m2.917 7 2.916 2.917 5.833-5.834"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="square"
    />
  </svg>
);

export default CheckAltIcon;
