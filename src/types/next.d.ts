import { NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server } from 'socket.io';

export interface NextIOResponse extends NextApiResponse {
  socket: {
    server: NetServer & {
      io: Server;
    };
  };
}
