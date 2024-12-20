import type { ReactElement } from 'react';

type Props = {
  title: string | ReactElement;
  titleProps?: PageHeaderTitleProps;
  rightSection?: React.ReactNode;
};

const PageHeader = ({ title, titleProps, rightSection }: Props) => {
  let titleComponent = title;

  if (typeof title === 'string')
    titleComponent = (
      <PageHeader.Title {...titleProps} data-cy={titleProps?.['data-cy'] || ''}>
        {title}
      </PageHeader.Title>
    );

  return (
    <div className="mt-11 flex items-center">
      {titleComponent}

      {rightSection && <div className="ml-auto">{rightSection}</div>}
    </div>
  );
};

type PageHeaderTitleProps = {
  children: string;
  'data-cy': string;
};

PageHeader.Title = ({ ...rest }: PageHeaderTitleProps) => (
  <h2 className="font-bold text-4xl" {...rest} />
);

export { PageHeader };
