import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getOrCreateConversation } from "@/src/shared/lib/conversation";
import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";
import { ChatHeader } from "@/src/widgets/chat/chat-header";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currenMember = await db.member.findFirst({
    where: {
      id: params.memberId,
      serverId: params.serverId,
    },
    include: {
      profile: true,
    },
  });

  if (!currenMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currenMember.id,
    params.memberId,
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className={"bg-white dark:bg-[#313338] flex flex-col h-full"}>
      <ChatHeader
        serverId={params.serverId}
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        type={"conversation"}
      />
    </div>
  );
};

export default MemberIdPage;
