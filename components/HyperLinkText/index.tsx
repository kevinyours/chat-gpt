import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface HyperLinkTextProps {
  href: string;
  style?: string;
}

const HyperLinkText = ({
  href,
  style,
  children,
}: PropsWithChildren<HyperLinkTextProps>) => {
  return (
    <Link href={href} target="_blank" className={twMerge('link', style)}>
      {children}
    </Link>
  );
};

export default HyperLinkText;
