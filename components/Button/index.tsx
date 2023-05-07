import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'style'
  > {
  isLoading?: boolean;
  onClick?: () => void;
  style?: string;
}

const Button = ({
  isLoading = false,
  onClick,
  style,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={twMerge(
        'btn btn-active btn-info btn-block',
        isLoading && 'loading',
        style
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
