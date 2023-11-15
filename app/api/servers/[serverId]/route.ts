import { NextResponse } from "next/server";

import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Сервер id не найден", { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("DELETE SERVER ID", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log(e);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
