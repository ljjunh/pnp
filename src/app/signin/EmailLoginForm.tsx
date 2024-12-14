// 'use client'

// import { useFormState } from "react-dom";
import { EmailFormBtn } from './EmailFormBtn';
import { handleEmailLogin } from './action';

export const EmailLoginForm = () => {
  // const [state, dispatch] = useFormState(handleEmailLogin, null)

  return (
    <form
      action={handleEmailLogin}
      className="flex flex-col gap-4"
    >
      <div>
        <input
          name="email"
          type="email"
          placeholder="이메일"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>
      <EmailFormBtn />
    </form>
  );
};
