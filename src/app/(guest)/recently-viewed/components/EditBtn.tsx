interface EditBtnProps {
  isEdit: boolean;
  toggleIsEdit: () => void;
}

export function EditBtn({ isEdit, toggleIsEdit }: EditBtnProps) {
  return (
    <button
      onClick={toggleIsEdit}
      className="cursor-pointer rounded-lg p-2 underline hover:bg-gray-100"
    >
      {isEdit ? '완료' : '수정'}
    </button>
  );
}
