import { cookies } from 'next/headers';
import Image from 'next/image';
import RegisterForm from '@/fragments/RegisterForm';
import LoginForm from '@/fragments/LoginForm';

export default function Main() {
  const cookieStore = cookies();
  const apiKey = cookieStore.get('apiKey');

  return (
    <div className="relative w-[calc(100%-2rem)] h-full py-8 box-border">
      <Image
        src="/openai.svg"
        alt="Open AI Logo"
        className="dark:invert mx-auto"
        width={104}
        height={104}
        priority
      />
      {apiKey?.value ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
