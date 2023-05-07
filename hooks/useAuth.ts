import fetcher from '@/helpers/fetcher';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, useState } from 'react';

export function useAuth() {
  const [input, setInput] = useState<string>('');
  const { push } = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  const login = async () => {
    if (!input) return;

    try {
      const response = await fetcher({
        url: '/api/login',
        payload: { payload: input },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      push('/rooms');
    } catch (err) {
      console.log(err);
      setInput('');
    }
  };

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    push('/');
  };

  return { input, onChange, login, logout };
}
