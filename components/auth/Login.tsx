import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { Button } from 'components/common/button';
import { signIn } from 'next-auth/client';

export interface LoginProps {
  children?: never;
}

export const Login: FunctionComponent<LoginProps> = () => {
  const [email, setEamil] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleEmailChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setEamil(e.target.value);
  };

  const handlePasswordChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    const res = await signIn('credentials', { email, password, callbackUrl: '/', redirect: false });
    if (res?.error) {
      setError(res.error);
    }
  };

  const inputClass =
    'mt-[12px] px-[12px] py-[8px] rounded-[8px] text-[16px] leading-[24px] tracking-[0.75px] focus:outline-none ring-1 ring-blueGray-200 focus:ring-2 focus:ring-blue-300';

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-blueGray-200">
      <form
        className="w-[320px] p-[24px] flex flex-col items-stretch bg-white rounded-[12px] shadow-md"
        onSubmit={handleLogin}
      >
        <p className="mb-[12px] text-center text-[24px] font-bold">Login</p>
        <input
          type="email"
          className={inputClass}
          value={email}
          placeholder="Enter Email address"
          onChange={handleEmailChanged}
          required
        />
        <input
          type="password"
          className={inputClass}
          value={password}
          placeholder="Enter password"
          onChange={handlePasswordChanged}
          required
        />
        {error && <p className="my-[8px] text-[14px] text-red-400">{error}</p>}
        <Button variant="primary" className="mt-[24px]">
          Sign In
        </Button>
      </form>
    </div>
  );
};
