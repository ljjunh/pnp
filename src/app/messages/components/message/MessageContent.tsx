import { Message, dummyMessages } from '@/app/messages/components/dummyMessages';
import { cn } from '@/lib/utils';

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

export function MessageContent() {
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
  );
}
