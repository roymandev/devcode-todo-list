type Props = {
  children: string;
  'data-cy': string;
};

export const PageTitle = ({ ...rest }: Props) => (
  <h2 className="font-bold text-4xl" {...rest} />
);
