import { redirect } from "next/navigation";

import { db } from "@/src/shared/lib/db";
import { initialProfile } from "@/src/shared/lib/initial-profile";

const SetupPage = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      member: {
        some: { profileId: profile.id },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <div>Create a Server</div>;
};

export default SetupPage;
