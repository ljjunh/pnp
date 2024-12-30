'use client';

interface RoomReviewEditButtonProps {
  editingContent: string;
  onClose: () => void;
}

export default function RoomReviewEditButton({
  editingContent,
  onClose,
}: RoomReviewEditButtonProps) {
  return (
    <button
      onClick={() => {
        onClose();
        console.log(editingContent);
      }}
      className="rounded-lg bg-black px-3 py-1 text-white hover:bg-black/90"
    >
      수정
    </button>
  );
}
