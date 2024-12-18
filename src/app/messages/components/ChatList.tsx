export function ChatList() {
  return (
    <section className="w-1/4 px-8 py-6">
    <header className="flex items-center justify-between">
      <h1 className="text-2xl">메시지</h1>
      <div className="flex gap-1">
        <div>검색 아이콘</div>
        <div>필터 아이콘</div>
      </div>
    </header>
    <div className="flex gap-2">
      <button>필터 버튼</button>
      <button>읽지 않음</button>
    </div>
    <ul>채팅 목록</ul>
  </section>
  )
}