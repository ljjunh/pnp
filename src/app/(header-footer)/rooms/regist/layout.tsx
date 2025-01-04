export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="px-60 pb-20">{children}</div>
    </>
  );
}
