import { NextRequest } from 'next/server';
import { messageInputSchema } from '@/schemas';
import { Server } from 'socket.io';
import { NextIOResponse } from '@/types/next';

export async function GET(request: NextRequest, response: NextIOResponse) {
  if (response.socket.server.io) {
    response.end();
    return;
  }

  const io = new Server(response.socket.server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  response.socket.server.io = io;

  io.on('connection', (socket) => {
    socket.on('enter', async (roomId) => {
      socket.join(roomId);
      console.log(`user entered room: ${roomId}`);
    });

    socket.on('message', async (message) => {
      try {
        const data = messageInputSchema.parse(message);
      } catch (error) {
        console.error(error);
        socket.emit('error', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  response.end();
}
