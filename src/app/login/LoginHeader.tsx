interface LoginHeaderProps {
  onBack?: () => void;
}

export function LoginHeader({ onBack }: LoginHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      {onBack ? (
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="text-2xl">×</span>
        </button>
      ) : (
        <div />
      )}
      <h1 className="text-lg font-bold">로그인 또는 회원가입</h1>
      <div />
    </header>
  );
}
