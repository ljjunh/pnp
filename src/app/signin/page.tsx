import { EmailLoginForm } from '@/app/signin/EmailLoginForm';
import { LoginHeader } from '@/app/signin/LoginHeader';
import { SocialLogin } from '@/app/signin/SocialLogin';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <main className="w-full max-w-screen-sm rounded-lg border bg-white">
        <LoginHeader />

        <section
          className="p-6"
          role="main"
        >
          <p className="mb-4 font-semibold text-gray-700">에어비앤비에 오신 것을 환영합니다.</p>
          <EmailLoginForm />
          <SocialLogin />
        </section>
      </main>
    </div>
  );
}
