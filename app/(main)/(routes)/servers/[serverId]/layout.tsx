import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";
import { ServerSidebar } from "@/src/widgets/server/server-sidebar";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
}

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className={" h-full"}>
      <div
        className={"hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed"}
      >
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className={"h-full md:pl-60"}>{children}</main>
    </div>
  );
};

export default ServerIdLayout;
