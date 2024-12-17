import { EmailLoginForm } from '@/app/signin/components/EmailLoginForm';
import { LoginHeader } from '@/app/signin/components/LoginHeader';
import { SocialLogin } from '@/app/signin/components/SocialLogin';
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
