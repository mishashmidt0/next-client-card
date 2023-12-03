"use client";
import { Fragment, useRef, type ElementRef } from "react";

import { type Member, type Message, type Profile } from "@prisma/client";
import dayjs from "dayjs";
import { Loader2, ServerCrash } from "lucide-react";

import { ChatItem } from "./chat-item";

import { useChatQuery } from "@/src/shared/hooks/use-chat-query";
import { useChatScroll } from "@/src/shared/hooks/use-chat-scroll";
import { useChatSocket } from "@/src/shared/hooks/use-chat-socket";
import { ChatWelcome } from "@/src/widgets/chat/chat-welcome";
type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const DATE_FORMAT = "d MMM YYYY, HH:mm";

interface ChatMessagesProps {
  name: string;
  member: Member;
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
  member,
  paramKey,
  paramValue,
  type,
  name,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useChatQuery({
      queryKey,
      paramKey,
      paramValue,
      apiUrl,
    });

  useChatSocket({ addKey, updateKey, queryKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });
  if (status === "pending") {
    return (
      <div className={"flex flex-col flex-1 justify-center items-center"}>
        <Loader2 className={"w-7  h-7 text-zinc-500 animate-spin my-4"} />
        <p className={"text-xs text-zinc-500 dark:text-zinc-400"}>
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={"flex flex-col flex-1 justify-center items-center"}>
        <ServerCrash className={"w-7  h-7 text-zinc-500  my-4"} />
        <p className={"text-xs text-zinc-500 dark:text-zinc-400"}>
          Что то пошло не так!
        </p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className={"flex-1 flex flex-col py-4 overflow-y-auto"}>
      {!hasNextPage && <div className={"flex-1"} />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className={"flex justify-center"}>
          {isFetchingNextPage ? (
            <Loader2 className={"w-6  h-6 text-zinc-500 animate-spin my-4"} />
          ) : (
            <button
              onClick={async () => await fetchNextPage()}
              className={
                "text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
              }
            >
              Load prevision messages
            </button>
          )}
        </div>
      )}
      <div className={"flex flex-col-reverse mt-auto"}>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items?.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                socketQuery={socketQuery}
                socketUrl={socketUrl}
                id={message.id}
                member={message.member}
                fileUrl={message.fileUrl}
                content={message.content}
                currentMember={member}
                deleted={message.deleted}
                isUpdated={message.updatedAt !== message.createdAt}
                timestamp={dayjs(message.createdAt).format(DATE_FORMAT)}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
