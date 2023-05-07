'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

const InvalidSession = () => {
  const { replace } = useRouter();

  return (
    <Fragment>
      <h1 className="text-lg text-center text-red-600 pb-4">Invalid Session</h1>
      <Button onClick={() => replace('/')}>Register Your Open AI Key</Button>
    </Fragment>
  );
};

export default InvalidSession;
