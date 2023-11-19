import { type Server as NetServer } from "http";

import { type NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { type NextApiResponseServerIo } from "@/src/shared/types/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpsServer: NetServer = res.socket.server as any;

    // eslint-disable-next-line no-param-reassign
    res.socket.server.io = new ServerIO(httpsServer, {
      path,
      addTrailingSlash: false,
    });
  }
  res.end();
};

export default ioHandler;
