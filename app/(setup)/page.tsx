import { redirect } from "next/navigation";

import { db } from "@/src/shared/lib/db";
import { initialProfile } from "@/src/shared/lib/initial-profile";
import { InitialModal } from "@/src/widgets/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
