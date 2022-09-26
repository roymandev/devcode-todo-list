import twclsx from '@/lib/twclsx';

export type CustomButtonProps = React.ComponentPropsWithoutRef<'button'>;

const CustomButton = ({ className, ...rest }: CustomButtonProps) => (
  <button
    className={twclsx(
      'bg-primary flex h-[54px] items-center gap-[6px] rounded-full px-7 font-semibold text-white',
      className,
    )}
    {...rest}
  />
);

export default CustomButton;
