import { SignInForm } from "./sign-in-form.component";

const SignInView: React.FC = () => {
  return (
    <div className="w-full max-w-sm min-h-screen mx-auto px-2 flex flex-col gap-12 justify-start sm:justify-center items-center py-32 sm:p-0">
      <div>
        <h1 className="text-4xl font-extrabold text-center">Войти</h1>
      </div>
      <div className="w-full">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInView;
