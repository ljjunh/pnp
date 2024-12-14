interface LoginHeaderProps {
  onBack?: () => void;
}

export function LoginHeader({ onBack }: LoginHeaderProps) {
  return (
    <header
      className="flex items-center justify-between border-b p-4"
      role="banner"
    >
      {/* 모달일 경우 뒤로가기 버튼 렌더링 */}
      {onBack ? (
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700"
          aria-label="뒤로 가기"
          type="button"
        >
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            ×
          </span>
        </button>
      ) : (
        <div aria-hidden="true" />
      )}
      <h1
        className="text-lg font-bold"
        id="login-header"
      >
        로그인 또는 회원가입
      </h1>
      <div aria-hidden="true" />
    </header>
  );
}
