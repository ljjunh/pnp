import { cn } from '@/lib/utils';
import { FaUserCircle } from 'react-icons/fa';
import { IoImageOutline } from 'react-icons/io5';
import { Message, dummyMessages } from './dummyMessages';

interface ChatContentProps {
  showReservation: boolean;
  onToggleReservation: () => void;
}

interface MessageGroup {
  time: string;
  messages: Message[];
}

interface DateGroup {
  [key: string]: MessageGroup[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date);
};

const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  return `${hour < 12 ? '오전' : '오후'} ${hour < 12 ? hour : hour - 12}:${minutes}`;
};

export function ChatContent({ showReservation, onToggleReservation }: ChatContentProps) {
  // 날짜와 시간별로 메시지 그룹화
  const messagesByDateTime = dummyMessages.reduce((groups, message) => {
    const [date, time] = message.timestamp.split(' ');

    if (!groups[date]) {
      groups[date] = [];
    }

    // 같은 시간대의 메시지 그룹 찾기
    let timeGroup = groups[date].find(
      (group) => group.time === time && group.messages[0].sender === message.sender,
    );

    if (!timeGroup) {
      timeGroup = { time, messages: [] };
      groups[date].push(timeGroup);
    }

    timeGroup.messages.push(message);
    return groups;
  }, {} as DateGroup);

  return (
    <section
      className={`flex flex-col border-x transition-all duration-300 ease-in-out ${
        showReservation ? 'w-1/2' : 'w-3/4'
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b px-8 py-6">
        <div className="flex items-center gap-3">
          <FaUserCircle
            size={40}
            className="text-gray-500"
          />
          <h1 className="text-2xl">호스트 이름</h1>
        </div>
        {showReservation ? null : <button onClick={onToggleReservation}>예약보기</button>}
      </div>
      <div className="flex-1 space-y-6 overflow-y-scroll px-10 py-6">
        {Object.entries(messagesByDateTime).map(([date, timeGroups]) => (
          <div
            key={date}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <span className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-500">
                {formatDate(date)}
              </span>
            </div>
            {timeGroups.map((group, groupIndex) => (
              <div key={`${date}-${group.time}-${groupIndex}`}>
                <div
                  className={cn(
                    'flex',
                    group.messages[0].sender === 'host' ? 'justify-start' : 'justify-end',
                  )}
                >
                  <div className="max-w-[70%] space-y-2">
                    {/* 시간은 그룹당 한 번만 표시 */}
                    <p
                      className={cn(
                        'text-xs text-gray-500',
                        group.messages[0].sender === 'host' ? 'pl-3' : 'pr-3 text-right',
                      )}
                    >
                      {group.messages[0].sender === 'host' && '호스트 이름 '}
                      {formatTime(group.time)}
                    </p>
                    {/* 그룹 내 메시지들 */}
                    <div className="space-y-2">
                      {group.messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            'rounded-2xl px-4 py-2',
                            message.sender === 'host' ? 'bg-gray-100' : 'bg-gray-700 text-white',
                            message.isImage ? 'inline-block' : 'break-words',
                          )}
                        >
                          {message.isImage ? (
                            <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-gray-300">
                              이미지
                            </div>
                          ) : (
                            <p>{message.content}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex h-24 items-center gap-3 px-10">
        <IoImageOutline className="size-7" />
        <form className="relative w-full text-base">
          <input
            type="text"
            placeholder="메세지를 입력하세요."
            className="w-full rounded-3xl border border-gray-300 py-2 pl-6 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
          />
        </form>
      </div>
    </section>
  );
}
