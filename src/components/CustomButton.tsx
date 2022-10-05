import twclsx from '@/lib/twclsx';

export interface CustomButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  color?: keyof typeof colorsClass;
}

export const colorsClass = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-secondary',
  red: 'bg-danger text-white',
};

const CustomButton = ({
  className,
  color = 'primary',
  ...rest
}: CustomButtonProps) => (
  <button
    className={twclsx(
      'flex h-[54px] items-center gap-[6px] rounded-full px-7 font-semibold hover:opacity-70',
      colorsClass[color],
      className,
    )}
    {...rest}
  />
);

export default CustomButton;
