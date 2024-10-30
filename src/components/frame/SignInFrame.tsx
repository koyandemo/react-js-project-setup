import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '../input/Input';
import ButtonCustom from '@/button/ButtonCustom';
import { SignInSchema } from '@/types/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordHint } from '@/utils';
import { useNavigate } from 'react-router-dom';

const SignInFrame = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleLogin = async (value: z.infer<typeof SignInSchema>) => {
    try {
      console.log(value);
      navigate("/")
        // const res = await signIn('credentials', {
        //   email: value.email,
        //   password: value.password,
        //   redirect: false,
        // });
        // if (res?.error) {
        //   console.log(res?.error);
        //   setErrorMessage('Incorrect email or password.');
        //   setTimeout(() => {
        //     setErrorMessage('');
        //   }, 3000);
        //   return;
        // }
        // if (!res?.error) {
        //   router.push('/my-cards');
        // }
    } catch (err) {
      setErrorMessage('Incorrect email or password.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="mt-4 w-full">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          sizer='full'
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
        {/* <a
          target="_blank"
          href="https://myshre.com/auth/forgot-password"
          className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
        >
          Forget Password?
        </a> */}
      </div>
      {errorMessage && (
        <span className="inline-block text-error text-xs">{errorMessage}</span>
      )}
      <div className="mt-8  flex flex-col w-full">
        <ButtonCustom type="submit" size="full" className='text-white'>
          Login
        </ButtonCustom>
      </div>
    </form>
  );
};

export default SignInFrame;
