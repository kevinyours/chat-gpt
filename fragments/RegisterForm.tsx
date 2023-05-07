'use client';

import Button from '@/components/Button';
import HyperLinkText from '@/components/HyperLinkText';
import TextInput from '@/components/TextInput';
import { useAuth } from '@/hooks/useAuth';
import { Fragment } from 'react';

const RegisterForm = () => {
  const { input, onChange, login } = useAuth();

  return (
    <Fragment>
      <div style={{ width: '100%', paddingTop: 240 }}>
        <TextInput
          value={input}
          label="Open AI API Key"
          placeholder="Please input Open AI API Key."
          onChange={onChange}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          paddingTop: 240,
          textAlign: 'center',
        }}
      >
        <Button disabled={!input} onClick={login}>
          Register
        </Button>
        <HyperLinkText href="https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/">
          How to get an Open AI API Key
        </HyperLinkText>
      </div>
    </Fragment>
  );
};

export default RegisterForm;
