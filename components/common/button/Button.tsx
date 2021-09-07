import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'normal';
}

export const Button: FunctionComponent<ButtonProps> = ({ variant = 'normal', className, ...rest }) => {
  const classes = clsx(
    className,
    'inline-flex justify-center items-center space-[4px] h-[36px] min-w-[36px] rounded-[4px] p-[8px] text-[14px] transition-colors duration-150',
    {
      'bg-white hover:bg-blueGray-100 active:bg-blueGray-200 disabled:bg-blueGray-200 disabled:text-blueGray-500 border border-blueGray-400 text-black':
        variant === 'normal',
      'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white': variant === 'primary',
    },
  );

  return <button className={classes} {...rest} />;
};
