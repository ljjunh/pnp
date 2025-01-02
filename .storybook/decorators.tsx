import { SessionProvider } from 'next-auth/react';

const mockSession = {
  user: {
    id: 'cm59s1q8w00001fbn54uf8evo',
    name: '김철수',
    email: 'test@example.com',
  },
  expires: '2100-01-01T00:00:00.000Z',
};

export const withSession = (Story: React.ComponentType) => (
  <SessionProvider session={mockSession}>
    <Story />
  </SessionProvider>
);
