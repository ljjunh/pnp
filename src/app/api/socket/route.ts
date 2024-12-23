import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { messageInputSchema } from '@/schemas';
import { Server as NetServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

export type NextIOResponse = NextApiResponse & {
  socket: Socket & {
    server?: NetServer & {
      io: Server;
    };
  };
};

export async function GET(request: NextRequest, response: NextIOResponse) {
  if (!response.socket?.server.io) {
    const httpServer = response.socket?.server as NetServer;
    const io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

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

    response.socket.server.io = io;
    response.end();
  }

  return new Response(null, { status: 201 });
}
