import { handleEmailLogin } from "./action";

export const EmailLoginForm = () => {
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
      <button
        type="submit"
        className="w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02 disabled:cursor-not-allowed disabled:opacity-50"
      >
        계속
      </button>
    </form>
  );
};
