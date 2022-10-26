import { SVGProps } from 'react';

const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 20h4L18.5 9.5a2.829 2.829 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4"
      stroke="#A4A4A4"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PencilIcon;
