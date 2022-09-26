import { SVGProps } from 'react';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 5v14M5 12h14"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusIcon;
