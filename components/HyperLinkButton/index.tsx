'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  href?: string;
  isLoading?: boolean;
  style?: string;
}

const HyperLinkButton = ({
  href,
  isLoading = false,
  style,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const { push } = useRouter();

  const onClick = () => {
    if (!href) return;
    push(href);
  };

  return (
    <button
      className={twMerge(
        'btn btn-active btn-info btn-block',
        isLoading && 'loading',
        style
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default HyperLinkButton;
