import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../input/Input';
import ButtonCustom from '@/button/ButtonCustom';
import { SignInSchema } from '@/types/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordHint } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { login } from '@/@api/authApi';

const SignInFrame = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   const handleBeforeUnload = (event:any) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [v]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (
    value: z.infer<typeof SignInSchema>
  ) => {
    try {
      setLoading(true);
      const res = await login(value);
      const token = res?.data?.data?.token;
      if (res?.data?.data?.token) {
        setLoading(false);
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Incorrect email or password.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.error(err);
    }
  };

  return (
    <form noValidate  onSubmit={handleSubmit(handleLogin)}>
      <div className="mt-4 w-full">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          sizer="full"
          placeholder="Email"
          register={register('email', { required: true })}
          error={errors['email']?.message}
        />
      </div>
      <div className="mt-4 flex flex-col justify-between">
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          sizer="full"
          placeholder={passwordHint}
          register={register('password', { required: true })}
          error={errors['password']?.message}
        />
      </div>
      {errorMessage && (
        <span className="inline-block text-red-500 text-xs">
          {errorMessage}
        </span>
      )}
        <ButtonCustom
          disabled={loading}
          type="submit"
          size="full"
          className="text-white mt-8"
        >
          {loading ? 'Loading ...' : 'Login'}
        </ButtonCustom>
    </form>
  );
};

export default SignInFrame;
