import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function getRoomTest() {
  const roomId = Math.floor(Math.random() * 1000) + 1;
  const url = `http://localhost:3000/api/rooms/${roomId}`;

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.get(url, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response body': (r) => r.body.length > 0,
  });

  sleep(1);
}
