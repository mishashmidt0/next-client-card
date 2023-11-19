import { type NextApiRequest, type NextApiResponse } from "next";

import { currentProfilePages } from "@/src/shared/lib/current-profile-pages";
import { db } from "@/src/shared/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!profile) {
      res.status(401).json({ message: "Unauthorized" });
    }

    if (!serverId) {
      res.status(400).json({ message: "Server Id missing" });
    }

    if (!channelId) {
      res.status(400).json({ message: "Channel Id missing" });
    }

    if (!content) {
      res.status(400).json({ message: "Content Id missing" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile?.id,
          },
        },
      },
    });

    if (!server) {
      res.status(404).json({ message: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      res.status(404).json({ message: "Channel not found" });
    }

    const member = server?.members.find(
      (member) => member.profileId === profile.id,
    );

    if (!member) {
      res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId as string}:message`;

    res?.socket?.server?.io.emit(channelKey, message);

    res.status(200).json(message);
  } catch (e) {
    console.log("[MESSAGES_POST]", e);

    res.status(500).json({ message: "Internal Error" });
  }
}
