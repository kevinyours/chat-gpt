'use client';

import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

const LoginForm = () => {
  const { push } = useRouter();
  const { logout } = useAuth();

  return (
    <Fragment>
      <div
        style={{
          width: '100%',
          paddingTop: 240,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <Button style="btn-success" onClick={() => push('/rooms')}>
          Go Chat Room
        </Button>
        <Button style="btn-warning" onClick={async () => await logout()}>
          Remove API Key
        </Button>
      </div>
    </Fragment>
  );
};

export default LoginForm;
