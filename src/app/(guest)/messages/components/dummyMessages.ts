export interface Message {
  id: number;
  sender: 'host' | 'guest';
  content: string;
  timestamp: string;
  isImage?: boolean;
}

export const dummyMessages: Message[] = [
  // 3월 18일
  {
    id: 1,
    sender: 'guest',
    content: '안녕하세요! 4월 1일부터 3일까지 숙박 가능할까요?',
    timestamp: '2024-03-18 10:30',
  },
  {
    id: 2,
    sender: 'host',
    content: '안녕하세요 게스트님! 해당 날짜에 예약 가능합니다 😊',
    timestamp: '2024-03-18 10:35',
  },
  {
    id: 3,
    sender: 'guest',
    content: '방 구조가 궁금한데 사진 몇 장 더 보여주실 수 있나요?',
    timestamp: '2024-03-18 10:36',
  },
  {
    id: 4,
    sender: 'host',
    content: '/images/room1.jpg',
    timestamp: '2024-03-18 10:38',
    isImage: true,
  },
  {
    id: 5,
    sender: 'host',
    content: '/images/room2.jpg',
    timestamp: '2024-03-18 10:38',
    isImage: true,
  },
  {
    id: 6,
    sender: 'host',
    content: '거실과 안방 사진입니다. 거실이 남향이라 햇빛이 잘 들어와요.',
    timestamp: '2024-03-18 10:39',
  },
  {
    id: 7,
    sender: 'guest',
    content: '좋네요! 주변에 편의점이나 마트는 있나요?',
    timestamp: '2024-03-18 14:22',
  },
  {
    id: 8,
    sender: 'host',
    content:
      '도보 3분 거리에 CU편의점이 있고, 5분 거리에 이마트24가 있습니다. 차로 5분 거리에 대형마트도 있어요!',
    timestamp: '2024-03-18 14:25',
  },

  // 3월 19일
  {
    id: 9,
    sender: 'guest',
    content: '체크인 시간이 몇 시인가요?',
    timestamp: '2024-03-19 09:15',
  },
  {
    id: 10,
    sender: 'host',
    content: '체크인은 오후 3시부터, 체크아웃은 오전 11시입니다!',
    timestamp: '2024-03-19 09:20',
  },
  {
    id: 11,
    sender: 'guest',
    content: '주차는 무료인가요?',
    timestamp: '2024-03-19 09:21',
  },
  {
    id: 12,
    sender: 'host',
    content:
      '네, 건물 내 지하주차장 무료 이용 가능합니다. 주차 가능한 차량 수를 알려주시면 미리 주차 공간 확보해드릴게요 :)',
    timestamp: '2024-03-19 09:25',
  },
  {
    id: 13,
    sender: 'guest',
    content: '차 2대 정도 될 것 같아요!',
    timestamp: '2024-03-19 11:42',
  },
  {
    id: 14,
    sender: 'host',
    content:
      '네, 2대 모두 가능합니다! 예약 진행하시면 주차장 위치와 이용 방법 자세히 안내해드릴게요',
    timestamp: '2024-03-19 11:45',
  },

  // 3월 20일
  {
    id: 15,
    sender: 'guest',
    content: '예약했습니다! 확인 부탁드려요 :)',
    timestamp: '2024-03-20 15:10',
  },
  {
    id: 16,
    sender: 'host',
    content: '네, 예약 확인했습니다! 4월 1일부터 3일까지 예약이 완료되었어요.',
    timestamp: '2024-03-20 15:15',
  },
  {
    id: 17,
    sender: 'host',
    content: '숙소 이용 안내와 주차장 이용 방법을 보내드립니다.',
    timestamp: '2024-03-20 15:16',
  },
  {
    id: 18,
    sender: 'host',
    content: '/images/guide.pdf',
    timestamp: '2024-03-20 15:16',
    isImage: true,
  },
  {
    id: 19,
    sender: 'guest',
    content: '감사합니다! 잘 보고 준비하겠습니다 😊',
    timestamp: '2024-03-20 15:20',
  },
  {
    id: 20,
    sender: 'host',
    content: '네, 편안한 여행 되시길 바랍니다! 추가 문의사항 있으시면 언제든 편하게 말씀해주세요.',
    timestamp: '2024-03-20 15:22',
  },
];
