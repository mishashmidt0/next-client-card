import { NextResponse } from "next/server";

import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    if (!params.memberId) {
      return new NextResponse("Members ID Missing", { status: 400 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        members: { include: { profile: true }, orderBy: { role: "asc" } },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[DELETE_ID_MEMBER]", e);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } },
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: { not: profile.id },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: { include: { profile: true }, orderBy: { role: "asc" } },
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[MEMBERS_ID_PATCH]", e);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
