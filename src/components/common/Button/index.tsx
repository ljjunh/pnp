const variants = {
  primary: 'bg-button-02 hover:bg-button-03 active:bg-button-01 text-shade-01',
  secondary: 'bg-shade-02 text-shade-01',
  tertiary: 'border border-shade-02 hover:bg-shade-02-5 active:hover:bg-shade-02-5 text-shade-02',
};

const sizes = {
  small: 'px-6 py-4 text-sm rounded-lg',
  full: 'w-full py-3.5 rounded-lg',
};

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'full';
  isLoading?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  size = 'small',
  isLoading = false,
  isDisabled = false,
  children,
  onClick,
}: ButtonProps) {
  const baseStyle =
    isLoading || isDisabled
      ? 'inline-flex items-center justify-center transition-colors'
      : 'inline-flex items-center justify-center transition-colors active:scale-90';

  const disabledStyle = isDisabled
    ? 'opacity-50 cursor-not-allowed bg-neutral-03 hover:bg-neutral-03 border-none'
    : '';

  const loadingStyle = isLoading
    ? variant !== 'secondary'
      ? 'cursor-wait bg-neutral-03 border-none hover:bg-neutral-03'
      : 'cursor-wait'
    : '';

  return (
    <button
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${disabledStyle} ${loadingStyle}`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <span
          role="status"
          aria-label="Loading"
          className="flex gap-1.5"
        >
          <span className="bg-neutral-02 h-2 w-2 rounded-full" />
          <span className="bg-shade-01 h-2 w-2 rounded-full" />
          <span className="bg-shade-01 h-2 w-2 rounded-full" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
