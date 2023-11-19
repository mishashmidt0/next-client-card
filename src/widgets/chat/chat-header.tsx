import { Hash } from "lucide-react";

import { SocketIndicator } from "@/src/entity/socket-indicator";
import { UserAvatar } from "@/src/entity/user-avatar";
import { MobileToggle } from "@/src/feature/mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  imageUrl,
  serverId,
  type,
  name,
}: ChatHeaderProps) => {
  return (
    <div
      className={
        "text-md text-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2"
      }
    >
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className={"w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"} />
      )}

      {type === "conversation" && (
        <UserAvatar src={imageUrl} className={"mr-2 w-8 h-8"} />
      )}
      <p className={"font-semibold text-md text-black dark:text-white"}>
        {name}
      </p>
      <div className={"ml-auto flex items-center"}>
        <SocketIndicator />
      </div>
    </div>
  );
};
