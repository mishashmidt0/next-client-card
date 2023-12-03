import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import { MediaRoom } from "@/src/entity/media-room";
import { currentProfile } from "@/src/shared/lib/current-profile";
import { db } from "@/src/shared/lib/db";
import { ChatHeader } from "@/src/widgets/chat/chat-header";
import { ChatInput } from "@/src/widgets/chat/chat-input";
import { ChatMessages } from "@/src/widgets/chat/chat-messages";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className={"bg-white dark:bg-[#313338] flex flex-col h-full"}>
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type={"channel"}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            apiUrl={"/api/messages"}
            name={channel.name}
            type={"channel"}
            chatId={channel.id}
            socketUrl={"/api/socket/messages"}
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            member={member}
            paramKey={"channelId"}
            paramValue={channel.id}
          />
          <ChatInput
            type={"channel"}
            name={channel.name}
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            apiUrl={"/api/socket/messages"}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;
