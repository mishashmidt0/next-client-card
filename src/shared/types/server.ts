import { type Server as NetServer, type Socket } from "net";

import { type Server, type Member, type Profile } from "@prisma/client";
import { type NextApiResponse } from "next";
import { type Server as SocketIOServer } from "socket.io";

export type ServerWithMembersWithProfiles = Server & {
  members: Array<Member & { profile: Profile }>;
};
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
