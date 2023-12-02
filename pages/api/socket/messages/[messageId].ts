import { MemberRole } from "@prisma/client";
import { type NextApiRequest } from "next";

import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";
import { type NextApiResponseServerIo } from "@/src/shared/types/server";
interface IQuery {
  messageId: string;
  serverId: string;
  channelId: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "DELTE" && req.method !== "PATCH") {
    res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfile();
    const { messageId, serverId, channelId } = req.query as unknown as IQuery;
    const { content } = req.body;

    if (!profile) {
      res.status(401).json({ message: "Unauthorized" });

      return;
    }

    if (!serverId) {
      res.status(400).json({ message: "Server ID missing" });

      return;
    }

    if (!channelId) {
      res.status(400).json({ message: "Channel ID missing" });

      return;
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      res.status(404).json({ message: "Server not found" });

      return;
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId,
      },
    });

    if (!channel) {
      res.status(404).json({ message: "Channel not found" });

      return;
    }

    const member = server.members.find(
      (member: any) => member.profileId === profile.id,
    );

    if (!member) {
      res.status(404).json({ message: "Member not found" });

      return;
    }

    const message = await db.message.findFirst({
      where: {
        id: messageId,
        channelId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted) {
      res.status(404).json({ message: "Message not found" });

      return;
    }

    const isMessageOwner = message.memberId === profile.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isAdmin || isModerator;

    if (!canModify) {
      res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        res.status(401).json({ message: "Unauthorized" });
      }

      await db.message.update({
        where: {
          id: messageId,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (req.method === "DELETE") {
      await db.message.update({
        where: {
          id: messageId,
        },
        data: {
          fileUrl: null,
          content: "Message deleted",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, message);

    res.status(200).json(message);
  } catch (e) {
    console.log("[MESSAGE_ID]", e);

    res.status(500).json({ error: "Internal Error" });
  }
}
