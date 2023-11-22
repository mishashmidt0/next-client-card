"use client";
import { type Member } from "@prisma/client";

import { ChatWelcome } from "@/src/widgets/chat/chat-welcome";

interface ChatMessagesProps {
  name: string;
  mamber: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
export const ChatMessages = ({
  chatId,
  socketQuery,
  socketUrl,
  apiUrl,
  mamber,
  paramKey,
  paramValue,
  type,
  name,
}: ChatMessagesProps) => {
  return (
    <div className={"flex-1 h-full flex-col py-4 overflow-y-auto"}>
      <div className={"flex-1"} />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};
