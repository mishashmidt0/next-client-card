import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be general", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            type,
            name,
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("CHANNELS_POST", e);

    return new NextResponse("Internal error", { status: 500 });
  }
}
