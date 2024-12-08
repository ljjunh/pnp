import Link from "next/link";

export default function TestPage() {
  return (
    <div>
      <h1>Test</h1>
      <Link href="/">Home</Link>
      <Link href="/login">로그인</Link>
    </div>
  );
}
