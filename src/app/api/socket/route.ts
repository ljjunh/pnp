import { NextRequest } from 'next/server';
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
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  response.end();
}
