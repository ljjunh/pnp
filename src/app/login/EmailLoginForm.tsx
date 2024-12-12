import { useEmailLogin } from '@/hooks/useEmailLogin';

export const EmailLoginForm = () => {
  const { email, error, successMessage, isSubmitting, handleEmailChange, handleSubmit } =
    useEmailLogin();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div>
        <input
          value={email}
          onChange={handleEmailChange}
          type="email"
          placeholder="이메일"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          disabled={isSubmitting}
          required
          aria-invalid={!!error}
          aria-describedby={
            error ? 'error-message' : successMessage ? 'success-message' : undefined
          }
        />
        {error && (
          <p
            id="error-message"
            role="alert"
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </p>
        )}
        {successMessage && (
          <p
            id="success-message"
            role="status"
            className="mt-1 text-sm text-green-600"
          >
            {successMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-button-01 py-3 text-white hover:bg-button-02 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? '처리중...' : '계속'}
      </button>
    </form>
  );
};
