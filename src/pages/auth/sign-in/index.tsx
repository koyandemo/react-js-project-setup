import SignInFrame from '@/components/frame/SignInFrame';

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-shrink-0 w-full lg:w-[500px] p-5  sm:px-0 bg-white rounded-2xl border">
      <div className="w-full md:p-8">
        <p className="text-xl text-gray-600 text-center">Welcome back!</p>
        <SignInFrame />
      </div>
    </div>
  );
};
export default SignInPage;
