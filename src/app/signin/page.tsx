import { EmailLoginForm } from '@/app/signin/EmailLoginForm';
import { LoginHeader } from '@/app/signin/LoginHeader';
import { SocialLogin } from '@/app/signin/SocialLogin';
import { MESSAGES } from '@/constants/login';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <main className="w-full max-w-screen-sm rounded-lg border bg-white">
        <LoginHeader />

        <section
          className="p-6"
          role="main"
        >
          <p className="mb-4 font-semibold text-gray-700">{MESSAGES.WELCOME}</p>

          <EmailLoginForm />

          <SocialLogin />
        </section>
      </main>
    </div>
  );
}
