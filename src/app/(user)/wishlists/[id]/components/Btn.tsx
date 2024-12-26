interface BtnProps {
  text: string;
}

export function Btn({ text }: BtnProps) {
  return <button className="rounded-3xl border px-4 py-2 text-sm">{text}</button>;
}
